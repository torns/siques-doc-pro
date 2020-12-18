package cn.siques.backend.controller;

import cn.siques.backend.dto.SearchDto;
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
    public Result search(@RequestBody SearchDto searchDto, @PathVariable String indexName) throws IOException {
        PageResult<JsonNode> jsonNodePageResult = searchService.strQuery(indexName, searchDto);
        return Result.succeed(jsonNodePageResult);
    }

}
