package cn.siques.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
@AllArgsConstructor
public class UserCollection extends Model<UserCollection> {

    Long userId;
    Long collectionId;

}
