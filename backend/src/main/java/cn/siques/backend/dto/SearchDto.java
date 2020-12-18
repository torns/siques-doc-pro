package cn.siques.backend.dto;

import lombok.Data;

/**
 * @author : heshenghao
 * @date : 11:42 2020/12/18
 */
@Data
public class SearchDto {
    /**
     * 搜索关键字
     */
    private String queryStr;
    /**
     * 当前页数
     */
    private Integer pageNum=1;
    /**
     * 每页显示数
     */
    private Integer pageSize=10;
    /**
     * 排序字段
     */
    private String sortCol;
    /**
     * 是否显示高亮
     */
    private Boolean isHighlighter = true;
    /**
     * es的路由
     */
    private String routing;
}
