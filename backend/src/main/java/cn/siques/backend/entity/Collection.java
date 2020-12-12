package cn.siques.backend.entity;

import cn.siques.backend.utils.model.DocEnum;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;

import java.util.Date;

/**
 * @author : heshenghao
 * @date : 18:43 2020/12/9
 */
@Data
public class Collection extends Model<User> {

    @TableId(type = IdType.AUTO )
    Long id;
    String name;
    Boolean isPublished;
    Date created;
    Date updated;
    String cover;
    DocEnum type;
    @TableLogic(value = "1",delval = "0")
    Boolean status;
}
