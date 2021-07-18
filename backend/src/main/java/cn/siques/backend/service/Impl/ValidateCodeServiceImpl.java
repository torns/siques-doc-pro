package cn.siques.backend.service.Impl;


import cn.siques.backend.service.ValidateCodeService;
import cn.siques.backend.template.RedisRepository;
import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author : heshenghao
 * @date : 20:36 2020/12/4
 */
@Service
@Slf4j
public class ValidateCodeServiceImpl implements ValidateCodeService {

    @Autowired
    private RedisRepository redisRepository;

    public static final MediaType JSONM_Media
            = MediaType.get("application/json;");

    private static String apikey = "a15d23ef365095cadfe6e4c77aeec912";

    /**
     * 保存手机验证码，与手机号绑定
     *
     * @param phoneNum 客户端生成
     * @param code 验证码信息
     */
    @Override
    public void sendCode(String phoneNum, String code) {
        String text = "【我思我趣】您的验证码是"+code+"。如非本人操作，请忽略本短信";
        OkHttpClient client = new OkHttpClient();
        RequestBody body = new FormBody.Builder()
                .add("apikey",apikey)
                .add("mobile",phoneNum)
                .add("text",text)
                .add("register","true")
                .build();
        Request request = new Request.Builder()
                .url("https://sms.yunpian.com/v2/sms/single_send.json")
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            save(phoneNum,code);
        }catch (Exception e){

        }
    }

    @Override
    public boolean validateCode( String phoneNum, String validCode) {
        return validCode.equals(get(phoneNum));
    }

    @Override
    public String oauthGit(Map<String, String> map) throws IOException {
        OkHttpClient client = new OkHttpClient();
        String json = com.alibaba.fastjson.JSON.toJSONString(map);
        okhttp3.RequestBody body = okhttp3.RequestBody.create(JSONM_Media, json);
        Request request = new Request.Builder()
                .url("https://github.com/login/oauth/access_token")
                .addHeader("accept","application/json")
                .post(body)
                .build();

         return client.newCall(request).execute().body().string();
    }


    public void save(String deviceId,String code) {
           redisRepository.setExpire(buildKey(deviceId),code,300);
    }

    /**
     *
     * @param deviceId 前端唯一标识/手机号
     */
    public String get(String deviceId) {
        return (String)redisRepository.get(buildKey(deviceId));
    }


    /**
     * 删除验证码
     * @param phoneNum 前端唯一标识/手机号
     */
    public void remove(String phoneNum) {
        redisRepository.del(buildKey(phoneNum));
    }


    private String buildKey(String phoneNum) {
        return  "DEFAULT_CODE_KEY:" + phoneNum;
    }
}
