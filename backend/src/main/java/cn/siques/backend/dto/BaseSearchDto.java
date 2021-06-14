package cn.siques.backend.dto;

import lombok.Data;

/**
 * @author: 何胜豪
 * @Title: TODO
 * @Package: cn.siques.backend.dto
 * @Description:
 * @date : 2021/6/14 0:14
 */
@Data
public class BaseSearchDto {

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
