package cn.siques.backend.controller;

import cn.siques.backend.entity.Doc;
import cn.siques.backend.entity.DocHistory;
import cn.siques.backend.service.DocHistoryService;
import cn.siques.backend.service.DocService;
import cn.siques.backend.utils.model.Result;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
//         .select(DocHistory.class,i->!i.getProperty().equals("body"))
        return Result.succeed(docHistories);
    }

    @GetMapping("/{id}")
    public Result findDetailById(@RequestParam String versionId, @PathVariable String id){
        DocHistory docHistory = docHistoryService.getOne(new QueryWrapper<DocHistory>()
                .eq("id",id).eq("versionId", versionId));
        return Result.succeed(docHistory);
    }

    @PutMapping()
    public Result retrack(@RequestParam String versionId){
        DocHistory docHistory = docHistoryService.getOne(new QueryWrapper<DocHistory>().eq("versionId", versionId));
        Long docId = docHistory.getId();
        UpdateWrapper<Doc> wrapper = new UpdateWrapper<Doc>().set("body", docHistory.getBody()).eq("id", docId);
        docService.update(wrapper);
        Doc doc = new Doc();
        doc.setBody(docHistory.getBody());
        return Result.succeed(doc);
    }

}
