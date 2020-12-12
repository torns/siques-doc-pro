package cn.siques.backend.dao;

import cn.siques.backend.entity.Doc;
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
public interface DocDao extends BaseMapper<Doc> {

    /**
     * 查询 包括已删除的文档
     * @param postIds
     * @return
     */
    @Select({
            "<script>",
            "select",
            "*",
            "from doc",
            "where id in",
            "<foreach collection='postIds' item='id' open='(' separator=',' close=')'>",
            "#{id}",
            "</foreach>",
            "</script>"
    })
    List<Doc> getListByIds(List<Long> postIds);


    /**
     * 恢复以删除的文档
     * @param docId
     * @return
     */
    @Update({"UPDATE doc SET STATUS = 1 WHERE id  = #{docId}"})
    int reuseDoc(String docId);
}
