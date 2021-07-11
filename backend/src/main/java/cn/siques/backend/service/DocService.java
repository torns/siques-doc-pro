package cn.siques.backend.service;

import cn.siques.backend.entity.Doc;
import cn.siques.backend.utils.page.PageRequest;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author : heshenghao
 * @date : 13:05 2020/12/9
 */
public interface DocService extends IService<Doc> {

    Page<Doc> findPage(PageRequest<Doc> pageRequest);

    /**
     * 新增
     * @return
     * @param
     * @param parentId
     * @param id
     */
    int insert(Long parentId, Long id, Long collectionId);

    /**
     * 查询文章树
     * @return
     * @param collectionId
     * @param isPublished
     */
    List<Doc> findTree(Long collectionId, Boolean isPublished);


    /**
     * 查询集合文章，忽略逻辑删除字段
     * @return
     * @param  postIds
     */
    List<Doc> getListByIds(List<Long> postIds);


    /**
     * 查询集合文章
     * @return
     * @param  collectionId
     */
    List<Doc> getDocsByCollectionId(Long collectionId);

    /**
     * 还原以删除的文档
     * @return
     * @param docId
     */
    int reuseDoc(String docId);

    /**
     * 更新文章并抽取内容
     * @param doc
     * @return
     */
    boolean updateAndExtract(Doc doc);

    /**
     * 真实删除
     * @param docId
     * @return
     */
    boolean realDelete(Long docId);

    /**
     * 文本审核
     * @param doPublishIds
     */
    void checkContent(List<Long> doPublishIds);

}
