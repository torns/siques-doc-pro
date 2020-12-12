package cn.siques.backend.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author : heshenghao
 * @date : 17:01 2020/12/9
 */
@Data
@AllArgsConstructor
public class CollectionDoc extends Model<CollectionDoc> {

    Long collectionId;
    Long docId;
}
