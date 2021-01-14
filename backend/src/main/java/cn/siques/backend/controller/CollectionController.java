package cn.siques.backend.controller;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.annotation.LoginUser;
import cn.siques.backend.config.OssFactory;
import cn.siques.backend.entity.Collection;
import cn.siques.backend.entity.Doc;
import cn.siques.backend.entity.UserCollection;
import cn.siques.backend.service.CollectionService;
import cn.siques.backend.service.UserCollectionService;
import cn.siques.backend.utils.model.JwtUserDetails;
import cn.siques.backend.utils.model.Result;
import cn.siques.backend.utils.page.PageRequest;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author : heshenghao
 * @date : 18:42 2020/12/9
 */
@RestController
@RequestMapping("/collection")

public class CollectionController {
    @Autowired
    private CollectionService collectionService;
    @Autowired
    private UserCollectionService userCollectionService;

    @Autowired
    OssFactory ossFactory;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy");

    /**
     * 集合分页查询
     * 展示模块
     * @param pageRequest
     * @return
     */
    @PostMapping("/findPage")
    @Cacheable(cacheNames = "collectionPage",key="#pageRequest")
    public Result<Page<Collection>> findPage(@RequestBody PageRequest<Doc> pageRequest){
        Page<Collection> collectionPage = new Page<>(pageRequest.getPageNum(), pageRequest.getPageSize());
        Page<Collection> page = collectionService.findPage(collectionPage);
        return Result.succeed(page);
    }



    @PutMapping
    public Result update(@RequestBody Collection collection){
        boolean b = collectionService.updateById(collection);
        return Result.succeed(b);
    }

    @PostMapping
    @Transactional
    public Result insert(@RequestBody Collection collection,@LoginUser JwtUserDetails userDetails){
        boolean a = collectionService.save(collection);
        boolean b = userCollectionService.save(new UserCollection(userDetails.getId(), collection.getId()));
        return Result.succeed(a && b);
    }

    @PostMapping("/cover")
    @Transactional
    public Result uploadCover(@LoginUser JwtUserDetails jwtUserDetails,@RequestParam("uploadFile") MultipartFile file,Collection collection) throws IOException {
        String originalFilename = file.getOriginalFilename();
        InputStream inputStream = file.getInputStream();
        String date = sdf.format(new Date());
        String s = ossFactory.putObject("collection/cover/"+jwtUserDetails.getId()
                +"/"+date+"/"+file.getSize()+originalFilename, inputStream);

        collection.setCover(s);
        boolean b;
        if(ObjectUtil.isNotEmpty(collection.getId())){
            b=collectionService.updateById(collection);
        }else {
            b=collectionService.save(collection);
            b=userCollectionService.save(new UserCollection(jwtUserDetails.getId(), collection.getId()));
        }

        return Result.succeed(b);
    }

    @GetMapping
    public Result getCollections(@LoginUser JwtUserDetails userDetails){
        // 获取用户id
        return Result.succeed( userCollectionService.getUserCollection(userDetails.getId()));
    }

    /**
     * 逻辑删除集合
     * @param userDetails
     * @param collectionId
     * @return
     */
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

    /**
     * 查询已经删除的集合
     * @param userDetails
     * @return Result
     */
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

    /**
     * 恢复集合
     * @param collectionId
     * @return
     */
    @GetMapping("/reuse")
    public Result reuse(@RequestParam String collectionId){
        return Result.succeed(collectionService.reuseCollection(collectionId));
    }



}
