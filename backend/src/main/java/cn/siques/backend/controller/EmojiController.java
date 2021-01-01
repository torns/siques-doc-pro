package cn.siques.backend.controller;

import cn.siques.backend.utils.model.Result;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

/**
 * @author : heshenghao
 * @date : 14:52 2021/1/1
 */
@RestController
@RequestMapping("/emoji")
public class EmojiController {

    @GetMapping()
    @Cacheable(cacheNames="emoji")
    public Result emoji() throws IOException {
        ClassPathResource resource = new ClassPathResource("emoji.json");
        InputStream ins = resource.getInputStream();

        Object parse = JSON.parse(ins.readAllBytes(), Feature.AllowArbitraryCommas);
        return Result.succeed(parse);
    }
}
