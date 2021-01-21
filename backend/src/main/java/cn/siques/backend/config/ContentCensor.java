package cn.siques.backend.config;

import com.baidu.aip.contentcensor.AipContentCensor;
import com.baidu.aip.http.AipRequest;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.HashMap;

/**
 * @author : heshenghao
 * @date : 17:30 2021/1/21
 * 百度文本反垃圾接口
 */
@Slf4j
@Component
public class ContentCensor {
    //设置APPID/AK/SK
    public static final String APP_ID = "23569184";
    public static final String API_KEY = "RZ5Q7tFFW6TnZOXxaCGNtV5D";
    public static final String SECRET_KEY = "3EBetnQtyrdg5sGGOmq0h9AsnOc58w65";
  
    @Bean
    private AipContentCensor aipContentCensor(){
        AipContentCensor client = new AipContentCensor(APP_ID, API_KEY, SECRET_KEY);
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);
        return client;
    }

    @Resource
    AipContentCensor aipContentCensor;

    public Boolean  textCensor(Long id, String text){
        JSONObject response = aipContentCensor.textCensorUserDefined(text);
        Integer conclusionType = 0;

        try {
            conclusionType = (Integer) response.get("conclusionType");

            log.info("DocId:{} | censor success | conclusionType: {}",id,response.get("conclusion"));
        }catch (Exception e){
            log.info("{} censor unValid",id);
            e.printStackTrace();
        }
        return conclusionType.equals(1);
    }

}
