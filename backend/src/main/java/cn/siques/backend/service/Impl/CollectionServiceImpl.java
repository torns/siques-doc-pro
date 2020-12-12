package cn.siques.backend.service.Impl;

import cn.siques.backend.dao.CollectionDao;
import cn.siques.backend.entity.Collection;
import cn.siques.backend.service.CollectionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : heshenghao
 * @date : 18:49 2020/12/9
 */
@Service
public class CollectionServiceImpl extends ServiceImpl<CollectionDao, Collection> implements CollectionService {
    @Autowired
    CollectionDao collectionDao;


    @Override
    public List<Collection> getListByIds(List<Long> collectIds) {
       return  collectionDao.getListByIds(collectIds);
    }

    @Override
    public int reuseCollection(String collectionId) {
        return  collectionDao.reuseCollection(collectionId);
    }
}
