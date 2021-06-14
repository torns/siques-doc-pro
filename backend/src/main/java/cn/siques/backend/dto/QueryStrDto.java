package cn.siques.backend.dto;

import lombok.Data;

/**
 * @author : heshenghao
 * @date : 11:42 2020/12/18
 */
@Data
public class QueryStrDto extends BaseSearchDto {
    /**
     * 搜索关键字
     */
    private String queryStr;

}
