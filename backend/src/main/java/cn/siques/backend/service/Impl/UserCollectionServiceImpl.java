package cn.siques.backend.service.Impl;

import cn.siques.backend.dao.UserCollectionDao;
import cn.siques.backend.entity.Collection;
import cn.siques.backend.entity.UserCollection;
import cn.siques.backend.service.CollectionService;
import cn.siques.backend.service.UserCollectionService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author : heshenghao
 * @date : 17:03 2020/12/9
 */
@Service
public class UserCollectionServiceImpl extends ServiceImpl<UserCollectionDao, UserCollection> implements UserCollectionService {
    @Autowired
    private UserCollectionService userCollectionService;
    @Autowired
    private CollectionService collectionService;

    @Override
    public List<Collection> getUserCollection(Long userId) {
        List<Long> collectIds = userCollectionService.list(new QueryWrapper<UserCollection>().eq("user_id", userId))
                .stream().map(u -> u.getCollectionId()).collect(Collectors.toList());
        List<Collection> collections = new ArrayList<>();
        if(collectIds.size()>0){
            collections =  collectionService.listByIds(collectIds);
        }
        return collections;
    }
}
