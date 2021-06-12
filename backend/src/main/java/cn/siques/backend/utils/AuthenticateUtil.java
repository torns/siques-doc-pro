package cn.siques.backend.utils;

import cn.hutool.core.util.URLUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import cn.siques.backend.service.ValidateCodeService;
import com.alibaba.fastjson.JSON;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.http.auth.AUTH;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * @author : heshenghao
 * @date : 13:42 2020/12/14
 */
public class AuthenticateUtil {
    // 第三方短信验证模块
    private static String apikey = "a15d23ef365095cadfe6e4c77aeec912";


    public static Map<String, Object> sendVerificationCode(String phoneNum, ValidateCodeService validateCodeService) {
        String random = String.valueOf(Math.random()).substring(2, 8);
        String text = "【我思我趣】您的验证码是"+random+"。如非本人操作，请忽略本短信";
        Map<String, String> params = new HashMap<>(3);
        params.put("apikey", apikey);
        params.put("mobile", phoneNum);
        params.put("text", text);
        params.put("register", "true");

        PostMethod postMethod = new PostMethod("https://sms.yunpian.com/v2/sms/single_send.json");
        postMethod.addRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        params.forEach((k, v) -> {
            postMethod.addParameter(k, v);
        });
        validateCodeService.savePhoneCode(phoneNum,random);
        return post(postMethod);
    }

    private  static Map<String, Object> post(PostMethod postMethod) {

        HttpClient httpClient = new HttpClient();

        try {
            httpClient.executeMethod(postMethod);
            String jsonStr = postMethod.getResponseBodyAsString();
            Map<String, Object> innerMap = JSON.parseObject(jsonStr).getInnerMap();
            return  innerMap;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
