package cn.siques.backend.service.Impl;

import cn.siques.backend.dao.CollectionDao;
import cn.siques.backend.dao.UserCollectionDao;
import cn.siques.backend.dao.UserDao;
import cn.siques.backend.entity.*;
import cn.siques.backend.service.CollectionDocService;
import cn.siques.backend.service.CollectionService;
import cn.siques.backend.service.DocService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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

    /**
     * 待优化
     * @param collectionPage
     * @return
     */
    @Override
    @Transactional
    public Page<Collection> findPage(Page<Collection> collectionPage) {
       return collectionDao.getPageList(collectionPage, new QueryWrapper<>());
    }
}
