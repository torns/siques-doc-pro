package cn.siques.backend.dao;

import cn.siques.backend.entity.Collection;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : heshenghao
 * @date : 13:06 2020/12/9
 */
@Repository
public interface CollectionDao extends BaseMapper<Collection> {

    /**
     * 查询 包括已删除的集合
     * @param collectIds
     * @return
     */
    @Select({
            "<script>",
            "select",
            "*",
            "from collection",
            "where id in",
            "<foreach collection='collectIds' item='id' open='(' separator=',' close=')'>",
            "#{id}",
            "</foreach>",
            "</script>"
    })
    List<Collection> getListByIds(List<Long> collectIds);


    @Select({"SELECT \n" +
            "  c.*,\n" +
            "  d.id AS docId,\n" +
            "  u.id AS userId,\n" +
            "  u.`username`,\n" +
            "  u.`avatar` \n" +
            "FROM\n" +
            "  collection c \n" +
            "  RIGHT JOIN doc d \n" +
            "    ON d.`id` = \n" +
            "    (SELECT \n" +
            "      cd.doc_id d_id \n" +
            "    FROM\n" +
            "      collection_doc cd,\n" +
            "      doc inerd \n" +
            "    WHERE cd.`collection_id` = c.`id` \n" +
            "      AND cd.`doc_id` = inerd.`id` \n" +
            "      AND inerd.`status` = 1 \n" +
            "      AND inerd.`is_published`=1\n" +
            "      AND inerd.`parent_id`=0\n" +
            "      ORDER BY inerd.`created` DESC\n" +
            "    LIMIT 1) \n" +
            "  LEFT JOIN user u \n" +
            "    ON u.`id` = \n" +
            "    (SELECT \n" +
            "      MIN(uc.user_id) u_id \n" +
            "    FROM\n" +
            "      user_collection uc \n" +
            "    WHERE uc.`collection_id` = c.`id`) \n" +
            "WHERE c.`status` = 1   "})
    Page<Collection> getPageList(IPage<Collection> page, @Param(Constants.WRAPPER)QueryWrapper<Collection> queryWrapper);


    /**
     * 恢复文章
     * @param collectionId
     * @return
     */
    @Update({"update collection set status = 1 where id = #{collectionId}"})
    int reuseCollection(String collectionId);
}
