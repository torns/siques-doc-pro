package cn.siques.backend.controller;

import cn.siques.backend.dto.PredictiveDto;
import cn.siques.backend.dto.QueryStrDto;
import cn.siques.backend.service.SearchService;
import cn.siques.backend.utils.PageResult;
import cn.siques.backend.utils.model.Result;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/**
 * @author : heshenghao
 * @date : 13:45 2020/12/18
 */
@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    SearchService searchService;


    @PostMapping("/{indexName}")
    public Result search(@RequestBody QueryStrDto searchDto, @PathVariable String indexName) throws IOException {
        PageResult<JsonNode> jsonNodePageResult = searchService.strQuery(indexName, searchDto);
        return Result.succeed(jsonNodePageResult);
    }


    @PostMapping("predictive/{indexName}")
    public Result predictive(@RequestBody PredictiveDto predictiveDto, @PathVariable String indexName) throws IOException {
        PageResult<JsonNode> jsonNodePageResult = searchService.predictiveQuery(indexName, predictiveDto);
        return Result.succeed(jsonNodePageResult);
    }
}
