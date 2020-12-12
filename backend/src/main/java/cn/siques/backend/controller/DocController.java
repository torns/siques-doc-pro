package cn.siques.backend.controller;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.entity.CollectionDoc;
import cn.siques.backend.entity.Doc;
import cn.siques.backend.service.CollectionDocService;
import cn.siques.backend.service.DocService;
import cn.siques.backend.utils.model.Result;
import cn.siques.backend.utils.page.PageRequest;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author : heshenghao
 * @date : 12:42 2020/12/9
 */
@RestController
@RequestMapping("/doc")
@AllArgsConstructor
public class DocController {

     private DocService docService;

     private CollectionDocService collectionDocService;

    @PostMapping("/findPage")
    public Result<Page<Doc>> findPage(@RequestBody PageRequest<Doc> pageRequest){
        Page<Doc> docPage = new Page<>(pageRequest.getPageNum(), pageRequest.getPageSize());
        Doc doc = pageRequest.getParams();
        QueryWrapper wrapper=new QueryWrapper<Doc>().orderByDesc("created");
        if(ObjectUtil.isNotEmpty(doc)){
            Map<String, String> searchMap = doc.toMap();

            if(searchMap.size()>0){
                wrapper.allEq(searchMap);
            }
        }
        Page<Doc> page = docService.page(docPage,wrapper);

        return Result.succeed(page);
    }

    @GetMapping("findTree")
    public Result findTree(@RequestParam("collectionId") Long collectionId){
      return Result.succeed(docService.findTree(collectionId));
    }


    /**
     * 插入文章，
     * @param
     * @return
     */
    @PostMapping()
    public Result insert(@RequestParam("parentId") Long parentId,
                         @RequestParam("collectionId") Long collectionId){
        return Result.succeed(docService.insert(parentId,collectionId));
    }


    /**
     * 移动文章,还需要修改集合post关系
     * @param
     * @return
     */
    @GetMapping("/move")
    public Result move(@RequestParam("parentId") Long parentId,
                         @RequestParam("currentId") Long currentId,
                       @RequestParam("collectionId") Long collectionId){
        if(parentId==0){
            docService.update(new UpdateWrapper<Doc>()
                    .eq("id", currentId)
                    .set("parentId", 0)
                    .set("parentIds", "0,")
            );
        }else{
            Doc parent = docService.getById(parentId);
           docService.update(new UpdateWrapper<Doc>()
                    .eq("id", currentId)
                    .set("parentId", parentId)
                    .set("parentIds", parent.getParentIds() + parentId + ",")
            );
        }
        boolean b = collectionDocService.update(new UpdateWrapper<CollectionDoc>()
                .eq("docId", currentId)
                .set("collectionId", collectionId)
        );

        return Result.succeed(b);
    }

    @PutMapping
    public Result update(@RequestBody Doc doc){
        boolean b = docService.updateById(doc);
        return Result.succeed(b);
    }


    @DeleteMapping("logic/{id}")
    public Result delete(@PathVariable String id){
        boolean a = docService.removeById(id);
        return Result.succeed(a);
    }

    @GetMapping("/deleted")
    public Result deleted(@RequestParam String collectionId){
        List<Long> docIds = collectionDocService.list(new QueryWrapper<CollectionDoc>()
                .eq("collectionId", collectionId))
                .stream().map(c -> c.getDocId()).collect(Collectors.toList());
        if(docIds.size()>0) {
            List<Doc> docs = docService.getListByIds(docIds).stream()
                    .filter(doc -> doc.getStatus() == false)
                    .collect(Collectors.toList());
            return Result.succeed(docs);
        }
        return Result.succeed(new ArrayList<>());
    }


    @GetMapping("/reuse")
    public Result reuse(@RequestParam String docId){
        return Result.succeed(docService.reuseDoc(docId));
    }

    @GetMapping()
    public Result docDetail(@RequestParam String docId){
          return Result.succeed(docService.getOne(new QueryWrapper<Doc>().eq("id", docId)));
    }
}
