package cn.siques.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

/**
 * @author : heshenghao
 * @date : 14:24 2020/12/9
 */
@Data

public class User extends Model<User> {

    @TableId(type = IdType.AUTO )
    Long id;
    String username;
    String nickname;
    String description;
    @JsonIgnore
    String password;
    Date created;
    Date updated;
    String phoneNumber;

}
