package cn.siques.backend.service;

import cn.siques.backend.entity.Collection;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Arrays;
import java.util.List;

/**
 * @author : heshenghao
 * @date : 18:48 2020/12/9
 */

public interface CollectionService extends IService<Collection> {
    /**
     * 查询用户所有集合，包括已删除
     * @param collectIds
     * @return
     */
    List<Collection> getListByIds(List<Long> collectIds);



    /**
     * 恢复集合
     * @param collectionId
     * @return
     */
    int reuseCollection(String collectionId);

    /**
     * 分页查询
     * @param collectionPage
     * @return
     */
    Page<Collection> findPage(Page<Collection> collectionPage);
}
