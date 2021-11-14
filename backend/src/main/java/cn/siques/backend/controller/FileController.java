package cn.siques.backend.controller;

import cn.siques.backend.annotation.LoginUser;
import cn.siques.backend.config.OssFactory;
import cn.siques.backend.dto.model.JwtUserDetails;
import cn.siques.backend.dto.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

/**
 * @author : heshenghao
 * @date : 0:20 2020/12/14
 */
@RestController
@RequestMapping("file")
public class FileController {
    @Autowired
    OssFactory ossFactory;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy");


    @PostMapping("upload")
    public Result upload(@LoginUser JwtUserDetails jwtUserDetails, @RequestParam("uploadFile") MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        InputStream inputStream = file.getInputStream();
        String date = sdf.format(new Date());
        String s = ossFactory.putObject("post/"+jwtUserDetails.getId()
                +"/"+date+"/"+file.getSize()+originalFilename, inputStream);

        HashMap<String, String> map = new HashMap<>();
        map.put("url",s);
        map.put("originalFilename",originalFilename);
        return Result.succeed(map);
    }

    @GetMapping("stsToken")
    public Result getToken(@LoginUser JwtUserDetails userDetails)
        {
            return Result.succeed(ossFactory.getSts(userDetails.getId()));
        }
}
