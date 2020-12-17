package cn.siques.backend.controller;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.annotation.LoginUser;
import cn.siques.backend.entity.Collection;
import cn.siques.backend.entity.CollectionDoc;
import cn.siques.backend.entity.Doc;
import cn.siques.backend.entity.UserCollection;
import cn.siques.backend.service.CollectionDocService;
import cn.siques.backend.service.CollectionService;
import cn.siques.backend.service.DocService;
import cn.siques.backend.service.UserCollectionService;
import cn.siques.backend.utils.model.DocEnum;
import cn.siques.backend.utils.model.JwtUserDetails;
import cn.siques.backend.utils.model.Result;
import cn.siques.backend.utils.page.PageRequest;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
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

     private CollectionService collectionService;

     private CollectionDocService collectionDocService;


     private UserCollectionService userCollectionService;

    /**
     * 文章分页查询
     * @param pageRequest
     * @return
     */
    @PostMapping("/findPage")
    public Result<Page<Doc>> findPage(@RequestBody PageRequest<Doc> pageRequest){
        Page<Doc> docPage = new Page<>(pageRequest.getPageNum(), pageRequest.getPageSize());
        Doc doc = pageRequest.getParams();
        QueryWrapper<Doc> wrapper=new QueryWrapper<Doc>()
                .eq("isPublished",true).orderByDesc("created");
        if(!doc.getType().equals(DocEnum.tfNews)){
            wrapper.select(Doc.class,i->!i.getProperty().equals("body"));
        }
        if(ObjectUtil.isNotEmpty(doc)){
            Map<String, String> searchMap = doc.toMap();

            if(searchMap.size()>0){
                wrapper.allEq(searchMap);
            }
        }
        Page<Doc> page = docService.page(docPage,wrapper);


        return Result.succeed(page);
    }




    /**
     * 查询文章树
     * @param collectionId
     * @return
     */
    @GetMapping("findTree")
    public Result findPublishedTree(@RequestParam("collectionId") Long collectionId
            ,@RequestParam(value = "isPublished",defaultValue = "false") Boolean isPublished){

        return Result.succeed(docService.findTree(collectionId,isPublished));
    }

    /**
     * 查询文章详情
     * @param docId
     * @return
     */
    @GetMapping()
    public Result docDetail(@RequestParam String docId){
        Long collectionId = collectionDocService.getOne(new QueryWrapper<CollectionDoc>().eq("docId", docId)).getCollectionId();
        Collection collection = collectionService.getById(collectionId);
        Doc doc = docService.getOne(new QueryWrapper<Doc>().eq("id", docId));
        doc.setCollection(collection);
        return Result.succeed(doc);
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
                    .set("isPublished",false)
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
        boolean b = docService.updateAndExtract(doc);
        return Result.succeed(b);
    }

    /**
     * 逻辑删除
     * @param id
     * @return
     */
    @DeleteMapping("logic/{id}")
    public Result delete(@PathVariable String id){
        boolean a = docService.removeById(id);
        return Result.succeed(a);
    }
    /**
     * 恢复文章
     * @param docId
     * @return
     */
    @GetMapping("/reuse")
    public Result reuse(@RequestParam String docId){
        return Result.succeed(docService.reuseDoc(docId));
    }

    /**
     * 真实删除
     */
    @DeleteMapping("real")
    public Result realDelete(@LoginUser JwtUserDetails userDetails,@RequestParam Long docId){
        QueryWrapper<CollectionDoc> docQueryWrapper = new QueryWrapper<CollectionDoc>().eq("docId", docId);
        Long collectionId = collectionDocService.getOne(docQueryWrapper).getCollectionId();
        userDetails.getId();
        List<Long> collectionIds = userCollectionService.getUserCollection(userDetails.getId()).stream().map(u -> u.getId())
                .collect(Collectors.toList());
        if(collectionIds.contains(collectionId)){
           boolean a = docService.realDelete(docId);
            boolean b=  collectionDocService.remove(docQueryWrapper);
            return Result.succeed(a&&b);
        }
        return Result.succeed(false);
    }

    /**
     * 查询集合中被删除的文章
     * @param collectionId
     * @return
     */
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



    /**
     * 文章发布
     * @param userDetails
     * @param docIds
     * @param collectionId
     * @return
     */
    @PostMapping("/publish")
    @Transactional
    public Result publish(@LoginUser JwtUserDetails userDetails,@RequestBody List<Long> docIds,@RequestParam Long collectionId){
        List<Long> allDocIds = docService.getDocsByCollectionId(collectionId)
                .stream().map(doc -> doc.getId()).collect(Collectors.toList());
        docService.update(new UpdateWrapper<Doc>().in("id",allDocIds).set("isPublished",false));
        boolean update = docService.update(new UpdateWrapper<Doc>().in("id", docIds).set("isPublished", true));
        return Result.succeed(update);
    }

    /**
     * 查询集合已经发布的内容
     * @param userDetails
     * @param collectionId
     * @return
     */
    @GetMapping("/publish")
    public Result published(@LoginUser JwtUserDetails userDetails,@RequestParam Long collectionId){
        List<Doc> docs = docService.getDocsByCollectionId(collectionId);

        List<Long> collect = docs.stream().filter(doc -> doc.getIsPublished().equals(true))
                .map(doc -> doc.getId()).collect(Collectors.toList());

        return Result.succeed(collect);
    }





}
