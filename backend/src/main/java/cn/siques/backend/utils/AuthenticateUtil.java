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
    private static String AUTH_URL = "https://captcha.yunpian.com/v1/api/authenticate";

    public  static Map<String, Object> auth(String authenticate, String token, String phoneNum, ValidateCodeService validateCodeService)  {
        Map<String, String> paramMap = new HashMap<>(8);
        // replace the following "{example}"s with actual values
        paramMap.put("captchaId", "9be9acc9203b4e279e14ec49b8499364");
        paramMap.put("secretId", "0591d4a113c74d8eb6a7d192c72fd02e");
        paramMap.put("token", token);
        paramMap.put("authenticate", authenticate);
        paramMap.put("version", "1.0");
        paramMap.put("timestamp", String.valueOf(System.currentTimeMillis()));
        paramMap.put("nonce", String.valueOf(new Random().nextInt(99999)));


        String signature = genSignature("b530583d923e4dc58d08adc7c138fca9", paramMap);
        paramMap.put("signature", signature);


        PostMethod postMethod = new PostMethod(AUTH_URL);
        postMethod.addRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        paramMap.forEach((k, v) -> {
            postMethod.addParameter(k, v);
        });
        Map<String, Object> post = post(postMethod);

        Integer code = (Integer) post.get("code");
        if(code.equals(0)){
            return sendVerificationCode(phoneNum,validateCodeService);
        }
        return null;
    }

    private static Map<String, Object> sendVerificationCode(String phoneNum, ValidateCodeService validateCodeService) {
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

    private static Map<String, Object> post(PostMethod postMethod) {

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

    /**
     * 生成签名
     * @param secretKey
     * @param params
     * @return
     */
    private static String genSignature(String secretKey, Map<String, String> params) {
        String[] keys = params.keySet().toArray(new String[0]);
        Arrays.sort(keys);
        StringBuilder sb = new StringBuilder();
        for (String key : keys) {
            sb.append(key).append(params.get(key));
        }
        sb.append(secretKey);
        return DigestUtils.md5Hex(sb.toString());
    }
}
