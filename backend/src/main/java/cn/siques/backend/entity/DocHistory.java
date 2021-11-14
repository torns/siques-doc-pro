package cn.siques.backend.entity;

import cn.siques.backend.dto.model.DocEnum;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

/**
 * @author : heshenghao
 * @date : 12:55 2020/12/9
 */
@Data
@Builder
public class DocHistory extends Model<DocHistory> {

    @TableId(type=IdType.ASSIGN_ID)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    Long versionId;
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
   Boolean status;

   Long sort;


     public  static DocHistory clone(Doc doc) {
        return DocHistory.builder().id(doc.getId())
                .title(doc.getTitle())
                .body(doc.getBody())
                .parentId(doc.getParentId())
                .parentIds(doc.getParentIds())
                .alias(doc.getAlias())
                .counts(doc.getCounts())
                .cover(doc.getCover())
                .created(doc.getCreated())
                .updated(doc.getUpdated())
                .isPublished(doc.getIsPublished())
                .sort(doc.getSort())
                .status(doc.getStatus())
                .build();
    }
}
