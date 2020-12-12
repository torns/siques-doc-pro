package cn.siques.backend.service.Impl;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.dao.CollectionDocDao;
import cn.siques.backend.dao.DocDao;
import cn.siques.backend.entity.CollectionDoc;
import cn.siques.backend.entity.Doc;
import cn.siques.backend.service.DocService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author : heshenghao
 * @date : 13:07 2020/12/9
 */
@Service
@AllArgsConstructor
public class DocServiceImpl extends ServiceImpl<DocDao, Doc> implements DocService {

    private DocDao docDao;

    private CollectionDocDao collectionDocDao;

    @Override
    public int insert(Long parentId, Long collectionId) {
        Doc parent = docDao.selectById(parentId);
        Doc post = new Doc();
        post.setStatus(true);
        post.setBody("");
        if(ObjectUtil.isNotEmpty(parent)){
            post.setParentId(parentId);
            post.setParentIds(parent.getParentIds()+parentId+",");
        }else{
            post.setParentId(0L);
            post.setParentIds("0,");
        }
        docDao.insert(post);
        return   collectionDocDao.insert(new CollectionDoc(collectionId,post.getId()));
    }

    @Override
    public List<Doc> findTree(Long id) {


        List<Long> docIds = collectionDocDao.selectList(new QueryWrapper<CollectionDoc>().eq("collectionId", id))
                .stream().map(c -> c.getDocId()).collect(Collectors.toList());
        if(docIds.size()==0){
            return new ArrayList<>();
        }
        List<Doc> docList = docDao.selectBatchIds(docIds);
        Map<Boolean, List<Doc>> collect = docList.stream().filter(post -> post.getStatus()==true)
                .collect(Collectors.partitioningBy(post -> post.getParentId() == 0));
        /** 根和叶子 */
        List<Doc> roots = collect.get(true);
        List<Doc> leafs = collect.get(false);

        for (Doc root : roots) {
            findChildren(root,leafs);
        }

        return roots;
    }

    @Override
    public List<Doc> getListByIds(List<Long> docIds) {
        List<Doc> docList = docDao.getListByIds(docIds);
        return docList;
    }

    @Override
    public int reuseDoc(String docId) {
        return docDao.reuseDoc(docId);
    }

    private void findChildren(Doc root, List<Doc> leafs) {
        Map<Boolean, List<Doc>> collect = leafs.stream().collect(Collectors.partitioningBy
                (post -> post.getParentId().equals(root.getId())));
        root.setChildren(collect.get(true));

        for (Doc post : collect.get(true)){
            findChildren(post,collect.get(false));
        }
    }


}
