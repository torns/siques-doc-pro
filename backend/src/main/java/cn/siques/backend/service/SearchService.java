package cn.siques.backend.service;

import cn.siques.backend.dto.SearchDto;
import cn.siques.backend.utils.PageResult;
import cn.siques.backend.utils.model.Result;
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
    PageResult<JsonNode> strQuery(String indexName, SearchDto searchDto) throws IOException;
}
