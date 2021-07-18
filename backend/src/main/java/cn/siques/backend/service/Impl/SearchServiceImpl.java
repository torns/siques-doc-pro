package cn.siques.backend.service.Impl;

import cn.siques.backend.dto.PredictiveDto;
import cn.siques.backend.dto.QueryStrDto;
import cn.siques.backend.service.SearchService;

import cn.siques.backend.utils.SearchBuilder;
import cn.siques.backend.utils.page.PageResult;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.JsonNode;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * @author : heshenghao
 * @date : 11:44 2020/12/18
 */
@Service
public class SearchServiceImpl implements SearchService {
    private final ElasticsearchRestTemplate elasticsearchRestTemplate;

    public SearchServiceImpl(ElasticsearchRestTemplate elasticsearchRestTemplate) {
        this.elasticsearchRestTemplate = elasticsearchRestTemplate;
    }

    @Override
    public PageResult<JSONObject> strQuery(String indexName, QueryStrDto searchDto) throws IOException {
        return SearchBuilder.builder(elasticsearchRestTemplate, indexName)
                .setStringQuery(searchDto.getQueryStr())
                .addSort(searchDto.getSortCol(), SortOrder.DESC)
                .setIsHighlight(searchDto.getIsHighlighter())
                .getPage(searchDto.getPageNum(), searchDto.getPageSize());
    }

    @Override
    public PageResult<JSONObject> predictiveQuery(String indexName, PredictiveDto predictiveDto) throws IOException {
        return SearchBuilder.builder(elasticsearchRestTemplate,indexName)
                .matchPhrasePrefixQuery(predictiveDto.getFiledName(),predictiveDto.getPrefix())
                .filter(new String[]{"id","type","title"},new String[]{})
                .addSort(predictiveDto.getSortCol(), SortOrder.DESC)
                .getPage(predictiveDto.getPageNum(), predictiveDto.getPageSize());
    }
}
