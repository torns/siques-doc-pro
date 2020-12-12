package cn.siques.backend.service;

import cn.siques.backend.entity.Doc;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author : heshenghao
 * @date : 13:05 2020/12/9
 */
public interface DocService extends IService<Doc> {
    /**
     * 新增
     * @return
     * @param
     * @param parentId
     * @param parentId
     */
    int insert(Long parentId, Long collectionId);

    /**
     * 查询文章树
     * @return
     * @param collectionId
     */
    List<Doc> findTree(Long collectionId);


    /**
     * 查询集合文章，忽略逻辑删除字段
     * @return
     * @param  postIds
     */
    List<Doc> getListByIds(List<Long> postIds);

    /**
     * 还原以删除的文档
     * @return
     * @param docId
     */
    int reuseDoc(String docId);

}
