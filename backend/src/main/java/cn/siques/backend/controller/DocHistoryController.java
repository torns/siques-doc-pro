package cn.siques.backend.controller;

import cn.siques.backend.entity.Doc;
import cn.siques.backend.entity.DocHistory;
import cn.siques.backend.service.DocHistoryService;
import cn.siques.backend.service.DocService;
import cn.siques.backend.dto.model.Result;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author : heshenghao
 * @date : 12:42 2020/12/9
 */
@RestController
@RequestMapping("/doc/history")
@AllArgsConstructor
public class DocHistoryController {
    DocHistoryService docHistoryService;
    DocService docService;

    @GetMapping()
    public Result findListById(@RequestParam String docId){
        List<DocHistory> docHistories = docHistoryService.list(new QueryWrapper<DocHistory>()
               .eq("id", docId).orderByDesc("updated"));
        return Result.succeed(docHistories);
    }

    @GetMapping("/{id}")
    public Result findDetailById(@RequestParam String versionId, @PathVariable String id){
        DocHistory docHistory = docHistoryService.getOne(new QueryWrapper<DocHistory>()
                .eq("id",id).eq("version_id", versionId));
        return Result.succeed(docHistory);
    }

    @PutMapping()
    public Result retrack(@RequestParam String versionId){
        DocHistory docHistory = docHistoryService.getOne(new QueryWrapper<DocHistory>().eq("version_id", versionId));
        Long docId = docHistory.getId();
        UpdateWrapper<Doc> wrapper = new UpdateWrapper<Doc>().set("body", docHistory.getBody()).eq("id", docId);
        docService.update(wrapper);
        Doc doc = new Doc();
        doc.setBody(docHistory.getBody());
        return Result.succeed(doc);
    }

}
