package cn.siques.backend.config;

import cn.hutool.json.JSONObject;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.common.comm.ResponseMessage;
import com.aliyun.oss.model.PutObjectResult;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.print.DocFlavor;
import java.io.InputStream;

/**
 * @author : heshenghao
 * @date : 21:02 2020/10/23
 */
@Component
public class OssFactory {
    @Value("${spring.oss.endpoint}")
    protected String endpoint;

    @Value("${spring.oss.urlPre}")
    protected String urlPre;

    @Value("${spring.oss.accessKeyId}")
    protected String accessKeyId;

    @Value("${spring.oss.accessKeySecret}")
    protected String accessKeySecret;

    @Value("${spring.oss.bucketName}")
    protected String bucketName;

    @Value("${spring.profiles.active}")
    protected String profile;

    protected OSS oss;

    @PostConstruct()
    private void OssFactory() {
        oss =  new OSSClientBuilder()
                .build(endpoint, accessKeyId, accessKeySecret);
    }




    public String putObject(String path, InputStream is){
        if(profile.equals("dev")) {
            path="dev/"+path;
        }
//        System.out.println(profile.equals("dev"));
        PutObjectResult result = oss.putObject(bucketName, path, is);

        return urlPre+path;
    }

    public void shutdown(){
        oss.shutdown();
    }

}