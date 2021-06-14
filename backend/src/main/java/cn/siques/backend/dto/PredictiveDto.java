package cn.siques.backend.dto;

import lombok.Data;

/**
 * @author: 何胜豪
 * @Title: TODO
 * @Package: cn.siques.backend.dto
 * @Description:
 * @date : 2021/6/14 0:16
 */
@Data
public class PredictiveDto extends BaseSearchDto {
    private String filedName;
    /**
     * 搜索前缀
     */
    private String prefix;
}
