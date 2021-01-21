package cn.siques.backend.entity;

import cn.siques.backend.utils.model.DocEnum;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author : heshenghao
 * @date : 12:55 2020/12/9
 */
@Data
public class Doc extends Model<Doc> {


    @TableId(type = IdType.AUTO )
    Long id;
   String title;

    String body;
   Date created;
   Date updated;
   Long parentId;
   String parentIds;
   String alias;
   Long counts;
   DocEnum type;
   Integer isPublished;
   String cover;
    Long views;
    Long sort;
   @TableLogic(value = "1",delval = "0")
   Boolean status;

   public Map<String,String> toMap(){
       HashMap<String, String> map = new HashMap<>(1);
       map.put("type",type.name());
       return map;
   }


   @TableField(exist = false)
   List<Doc> children;

    @TableField(exist = false)
   List<Tag> tags;

    @TableField(exist =false)
    Collection collection;
}
