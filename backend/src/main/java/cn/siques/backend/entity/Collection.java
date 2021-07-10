package cn.siques.backend.entity;

import cn.siques.backend.utils.model.DocEnum;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * @author : heshenghao
 * @date : 18:43 2020/12/9
 */
@Data
public class Collection extends Model<User> {

    @TableId(type = IdType.AUTO )
    Long id;
    String name;
    String description;
    Date created;
    Date updated;
    String cover;
    DocEnum type;
    @TableLogic(value = "1",delval = "0")
    Boolean status;

    @TableField(exist = false)
    Long userId;

    @TableField(exist = false)
    String userName;

    @TableField(exist = false)
    String avatar;

    @TableField(exist = false)
    Long docId;
}
