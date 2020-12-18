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

    @Autowired
    UserCollectionDao userCollectionDao;

    @Autowired
    CollectionDocService collectionDocService;

    @Autowired
    DocService docService;

    @Autowired
    UserDao userDao;

    @Override
    public List<Collection> getListByIds(List<Long> collectIds) {
       return  collectionDao.getListByIds(collectIds);
    }

    @Override
    public int reuseCollection(String collectionId) {
        return  collectionDao.reuseCollection(collectionId);
    }

    @Override
    @Transactional
    public Page<Collection> findPage(Page<Collection> collectionPage) {
        long l = System.currentTimeMillis();
        Page<Collection> selectPage = collectionDao.selectPage(collectionPage, new QueryWrapper<>());
        List<Long> collectIds = selectPage.getRecords().stream().map(collection -> collection.getId()).collect(Collectors.toList());
        List<CollectionDoc> collectionDocs = collectionDocService.list(new QueryWrapper<CollectionDoc>().in("collectionId", collectIds));

        List<Long> docIds =collectionDocs
                .stream().map(cd -> cd.getDocId()).collect(Collectors.toList());
        QueryWrapper<Doc> select = new QueryWrapper<Doc>().in("id", docIds).select(Doc.class, i -> !i.getProperty().equals("body"));

        List<Long> publishedIds = docService.list(select).stream().filter(doc -> doc.getIsPublished()).map(doc -> doc.getId()).collect(Collectors.toList());

        Map<Long, List<Long>> collectionDocIds = collectionDocs.stream()
                .filter(collectionDoc -> publishedIds.contains(collectionDoc.getDocId()))
                .collect(Collectors.groupingBy(cd -> cd.getCollectionId(),
                Collectors.mapping(collectionDoc -> collectionDoc.getDocId(), Collectors.toList())));


        List<UserCollection> userCollections = userCollectionDao.selectList(new QueryWrapper<UserCollection>()
                .in("collectionId",collectIds));
        Map<Long, Long> collectionUser = userCollections.stream().collect(Collectors.toMap(uc -> uc.getCollectionId(), uc -> uc.getUserId()));
        List<Long> userIds = userCollections.stream().map(uc -> uc.getUserId()).collect(Collectors.toList());
        Map<Long, User> idUser = userDao.selectBatchIds(userIds).stream().collect(Collectors.toMap(user -> user.getId(), user -> user));
        selectPage.getRecords().stream().forEach((collection) ->{
            collection.setUser(idUser.get(collectionUser.get(collection.getId())));
            collection.setDocIds(collectionDocIds.get(collection.getId()));
        });

       System.out.println(System.currentTimeMillis()-l);
       return selectPage;
    }
}
