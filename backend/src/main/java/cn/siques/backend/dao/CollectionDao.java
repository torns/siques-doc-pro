package cn.siques.backend.dao;

import cn.siques.backend.entity.Collection;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
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


    /**
     * 恢复文章
     * @param collectionId
     * @return
     */
    @Update({"update collection set status = 1 where id = #{collectionId}"})
    int reuseCollection(String collectionId);
}
