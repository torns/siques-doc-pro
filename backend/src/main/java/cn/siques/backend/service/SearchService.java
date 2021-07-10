package cn.siques.backend.service;

import cn.siques.backend.dto.PredictiveDto;
import cn.siques.backend.dto.QueryStrDto;

import cn.siques.backend.utils.page.PageResult;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

/**
 * @author : heshenghao
 * @date : 11:43 2020/12/18
 */
public interface SearchService {
    /**
     * StringQuery通用搜索
     * @param indexName 索引名
     * @param searchDto 搜索Dto
     * @return
     */
    PageResult<JsonNode> strQuery(String indexName, QueryStrDto searchDto) throws IOException;

    PageResult<JsonNode> predictiveQuery(String indexName,  PredictiveDto searchDto) throws IOException;
}
