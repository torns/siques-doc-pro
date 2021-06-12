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
import cn.siques.backend.template.RedisRepository;
import cn.siques.backend.utils.ReactiveAddrUtil;
import cn.siques.backend.utils.model.DocEnum;
import cn.siques.backend.utils.model.JwtUserDetails;
import cn.siques.backend.utils.model.Result;
import cn.siques.backend.utils.page.PageRequest;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.ServletWebRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * @author : heshenghao
 * @date : 12:42 2020/12/9
 */
@RestController
@RequestMapping("/doc")
@AllArgsConstructor
public class DocController {

    @Autowired
    RedisRepository redisRepository;

     private DocService docService;

     private CollectionService collectionService;

     private CollectionDocService collectionDocService;


     private UserCollectionService userCollectionService;

    /**
     * 文章分页查询
      * 展示模块
     * @param pageRequest
     * @return
     */
    @PostMapping("/findPage")
    @Cacheable(cacheNames = "dcoPage",key="#pageRequest")
    public Result<Page<Doc>> findPage(@RequestBody PageRequest<Doc> pageRequest){
        Page<Doc> docPage = new Page<>(pageRequest.getPageNum(), pageRequest.getPageSize());
        Doc doc = pageRequest.getParams();
        QueryWrapper<Doc> wrapper=new QueryWrapper<Doc>()
                .eq("isPublished",1).orderByDesc("created");
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
     * 查询文章详情,默认后台可查询
     * @param docId
     * @return
     */
    @GetMapping()
    @Transactional
    public Result docDetail(HttpServletRequest request, @RequestParam String docId, @RequestParam(value = "isPublished",defaultValue = "false") Boolean isPublished){
        QueryWrapper<Doc> wrapper = new QueryWrapper<Doc>().eq("id", docId);
        // 前台查询
        if(isPublished){
            wrapper.eq("isPublished", 1);
        }
        Doc doc = docService.getOne(wrapper);

        if(ObjectUtil.isNotEmpty(doc)){
          if(isPublished){
              String localAddr = ReactiveAddrUtil.getRemoteAddr(request);
              String key = localAddr+":"+docId;
              if(redisRepository.get(key)==null){
                  redisRepository.setExpire(key,true,1, TimeUnit.DAYS);
                  // pv 根据用户ip地址递增，同ip地址当天内不累计 每天重置
                  docService.update(new UpdateWrapper<Doc>().eq("id",docId).set("views",doc.getViews()+1));
              }
          }

            Long collectionId = collectionDocService.getOne(new QueryWrapper<CollectionDoc>().eq("docId", docId)).getCollectionId();
            Collection collection = collectionService.getById(collectionId);

            doc.setCollection(collection);
            return Result.succeed(doc);
        }
        return Result.failed("该文档已被删除或未发布");
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
                    .set("isPublished",0)
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
    @DeleteMapping("{id}")
    public Result delete(@PathVariable String id){
        boolean a = docService.removeById(id);
        return Result.succeed(a);
    }

    /**
     * 真实删除
     */
    @DeleteMapping()
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
     * 恢复文章
     * @param docId
     * @return
     */
    @GetMapping("/reuse")
    public Result reuse(@RequestParam String docId){
        return Result.succeed(docService.reuseDoc(docId));
    }



    /**
     * 查询集合中被逻辑删除的文章
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
     * @param doPublishIds
     * @param collectionId
     * @return
     */
    @PostMapping("/publish")
    @Transactional

    public Result publish(@LoginUser JwtUserDetails userDetails,@RequestBody List<Long> doPublishIds,@RequestParam Long collectionId){
        List<Doc> docs = docService.getDocsByCollectionId(collectionId);
        // 集合中所有文章的Id
        List<Long> docIds = docs.stream().map(doc -> doc.getId()).collect(Collectors.toList());
        if(doPublishIds.size()==0) {
            Boolean a = docService.update(new UpdateWrapper<Doc>().in("id", docIds).set("isPublished", 0));
            return Result.succeed(a);
        }
        // 已发布的Id
        List<Long> publishedIds = docs.stream().filter(doc -> doc.getIsPublished().equals(1))
                .map(doc -> doc.getId()).collect(Collectors.toList());
        // 取消发布的Id
        List<Long> unPubIds = new ArrayList<>();
        publishedIds.forEach(id->{
            boolean remove = doPublishIds.remove(id);
            if(!remove){
                unPubIds.add(id);
            }
        });

        if(unPubIds.size()>0){
            docService.update(new UpdateWrapper<Doc>().in("id", unPubIds).set("isPublished", 0));
        }
        if(doPublishIds.size()>0){
            // 设置为审核中
              docService.update(new UpdateWrapper<Doc>().in("id", doPublishIds).set("isPublished", 2));
              docService.checkContent(doPublishIds);
        }

        return Result.succeed(true);
    }

    /**
     * 查询集合已经发布的文章Id集合
     * @param userDetails
     * @param collectionId
     * @return
     */
    @GetMapping("/publish")
    public Result published(@LoginUser JwtUserDetails userDetails,@RequestParam Long collectionId){
        List<Doc> docs = docService.getDocsByCollectionId(collectionId);

        List<Long> collect = docs.stream().filter(doc -> doc.getIsPublished().equals(1))
                .map(doc -> doc.getId()).collect(Collectors.toList());

        return Result.succeed(collect);
    }


    @GetMapping("/seo/sitemap")
    public Result sitemap(){
        QueryWrapper<Doc> wrapper=new QueryWrapper<Doc>()
                .select(Doc.class,i->!i.getProperty().equals("body"))
                .eq("type",DocEnum.doc)
                .eq("isPublished",1).orderByDesc("created");

        return Result.succeed(docService.list(wrapper));
    }



}
