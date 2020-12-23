package cn.siques.backend.service.Impl;

import cn.hutool.core.date.DateUnit;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.dao.CollectionDocDao;
import cn.siques.backend.dao.DocDao;
import cn.siques.backend.entity.CollectionDoc;
import cn.siques.backend.entity.Doc;
import cn.siques.backend.entity.DocHistory;
import cn.siques.backend.service.DocHistoryService;
import cn.siques.backend.service.DocService;

import cn.siques.backend.utils.RegexUtils;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import org.apache.http.client.utils.DateUtils;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author : heshenghao
 * @date : 13:07 2020/12/9
 */
@Service
@AllArgsConstructor
public class DocServiceImpl extends ServiceImpl<DocDao, Doc> implements DocService {

    private DocDao docDao;

    private CollectionDocDao collectionDocDao;

    private DocHistoryService docHistoryService;

    @Override
    public int insert(Long parentId, Long collectionId) {
        Doc parent = docDao.selectById(parentId);
        Doc post = new Doc();
        post.setStatus(true);
        post.setBody("<h1>未命名文档</h1><p>在这里开始书写之旅</p>");
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
    public List<Doc> findTree(Long id, Boolean isPublished) {


        List<Long> docIds = collectionDocDao.selectList(new QueryWrapper<CollectionDoc>().eq("collectionId", id))
                .stream().map(c -> c.getDocId()).collect(Collectors.toList());
        if(docIds.size()==0){
            return new ArrayList<>();
        }
        QueryWrapper<Doc> queryWrapper = new QueryWrapper<>();
        queryWrapper.in("id",docIds).select(Doc.class,i->!i.getProperty().equals("body"));
        List<Doc> docList = this.list(queryWrapper);
        Stream<Doc> docStream = docList.stream().filter(post -> post.getStatus() == true);
        if(isPublished){
              docStream = docStream.filter(post -> post.getIsPublished().equals(true));
        }

        Map<Boolean, List<Doc>> collect= docStream.collect(Collectors.partitioningBy(post -> post.getParentId() == 0));
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
    public List<Doc> getDocsByCollectionId(Long collectionId) {
        List<Long> docIds = collectionDocDao.selectList(new QueryWrapper<CollectionDoc>()
                .eq("collectionId", collectionId)).stream()
                .map(collectionDoc -> collectionDoc.getDocId()).collect(Collectors.toList());
        if(docIds.size()>0){
            QueryWrapper<Doc> wrapper = new QueryWrapper<Doc>()
                    .select(Doc.class, i -> !i.getProperty().equals("body"))
                    .in("id",docIds);
            return docDao.selectList(wrapper);
        }
        return  new ArrayList<>();
    }

    @Override
    public int reuseDoc(String docId) {
        return docDao.reuseDoc(docId);
    }

    @Override
    public boolean updateAndExtract(Doc doc) {
       if(ObjectUtil.isNotNull(doc.getBody())){
           String s = RegexUtils.searchOne("(?<=<img src=\")(.*?)(?=\">)", doc.getBody());
           doc.setCover(s);

           String rawStr = doc.getBody().replaceAll("<\\/?.+?\\/?>", "")
                   .replaceAll("\\n", "");

           doc.setCounts(Long.valueOf(rawStr.length()));

           if(rawStr.length() > 150){
               rawStr = rawStr.substring(0,150);
           }
           doc.setAlias(rawStr);
           doc.setUpdated(new Date());
       }
        docDao.updateById(doc);

        saveHistory(doc);

        return false;
    }

    private boolean saveHistory(Doc doc){
        doc = docDao.selectById(doc.getId());

        List<DocHistory> docHistories = docHistoryService.list(
                new QueryWrapper<DocHistory>().eq("id",
                        doc.getId()).orderByDesc("updated"));
        boolean b = removeLRU(docHistories);
        if(b){
            log.debug("删除用户最少使用文档");
        }
        if(docHistories.size()==0){
            docHistoryService.save(DocHistory.clone(doc));
        }else{
            DocHistory firstDoc = docHistories.get(0);
            if(DateUtil.between(firstDoc.getUpdated(), doc.getUpdated(), DateUnit.HOUR)> 8 &&
               !firstDoc.getBody().equals(doc.getBody())){
               docHistoryService.save(DocHistory.clone(doc));
            }

        }
        return true;
    }

    private boolean removeLRU(List<DocHistory> docHistories) {
        if(docHistories.size() > 30){
            List<Date> collect = docHistories.stream().skip(30).map(docHistory -> docHistory.getUpdated())
                    .collect(Collectors.toList());

            return docHistoryService.remove(new QueryWrapper<DocHistory>().in("updated",collect));
        }
        return  false;
    }

    @Override
    public boolean realDelete(Long docId) {
        return docDao.realDelete(docId);
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
