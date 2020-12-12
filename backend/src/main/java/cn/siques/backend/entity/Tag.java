package cn.siques.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;

import java.util.Date;

/**
 * @author : heshenghao
 * @date : 20:45 2020/12/9
 */
@Data
public class Tag extends Model<Tag> {
    @TableId(type = IdType.AUTO )
    Long id;
    String name;
    String alias;
    String description;
    Date created;
}
