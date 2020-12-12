package cn.siques.backend.controller;

import cn.siques.backend.annotation.LoginUser;
import cn.siques.backend.entity.Collection;
import cn.siques.backend.entity.CollectionDoc;
import cn.siques.backend.entity.Doc;
import cn.siques.backend.entity.UserCollection;
import cn.siques.backend.service.CollectionService;
import cn.siques.backend.service.UserCollectionService;
import cn.siques.backend.utils.model.JwtUserDetails;
import cn.siques.backend.utils.model.Result;
import cn.siques.backend.utils.page.PageRequest;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author : heshenghao
 * @date : 18:42 2020/12/9
 */
@RestController
@RequestMapping("/collection")
@AllArgsConstructor
public class CollectionController {

    private CollectionService collectionService;
    private UserCollectionService userCollectionService;

    @PostMapping
    @Transactional
    public Result insert(@RequestBody Collection collection,@LoginUser JwtUserDetails userDetails){
        boolean a = collectionService.save(collection);
        boolean b = userCollectionService.save(new UserCollection(userDetails.getId(), collection.getId()));
        return Result.succeed(a && b);
    }

    @PutMapping
    public Result update(@RequestBody Collection collection){
        boolean b = collectionService.updateById(collection);
        return Result.succeed(b);
    }

    @GetMapping
    public Result getCollections(@LoginUser JwtUserDetails userDetails){
        // 获取用户id
        return Result.succeed( userCollectionService.getUserCollection(userDetails.getId()));
    }

    @DeleteMapping()
        public Result delete(@LoginUser JwtUserDetails userDetails,@RequestParam Long collectionId){
        List<Collection> collections = userCollectionService.getUserCollection(userDetails.getId()).stream()
                .filter(collection -> collection.getId().equals(collectionId)).collect(Collectors.toList());
        if(collections.size()>0){
            boolean b = collectionService.removeById(collectionId);
            return Result.succeed(b);
        }

        return Result.succeed(false);
    }

    @GetMapping("/deleted")
    public Result deleted(@LoginUser JwtUserDetails userDetails){
        List<Long> collectIds = userCollectionService.list(new QueryWrapper<UserCollection>()
                .eq("userId", userDetails.getId()))
                .stream().map(c -> c.getCollectionId()).collect(Collectors.toList());
        if(collectIds.size()>0){
            List<Collection> collect = collectionService.getListByIds(collectIds).stream()
                    .filter(c -> c.getStatus() == false)
                    .collect(Collectors.toList());
            return Result.succeed(collect);
        }
        return Result.succeed(new ArrayList<>());
    }

    @GetMapping("/reuse")
    public Result reuse(@RequestParam String collectionId){
        return Result.succeed(collectionService.reuseCollection(collectionId));
    }



}
