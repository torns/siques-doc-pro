package cn.siques.newstask.config;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
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

//    public OssFactory create(){
//
//        return this;
//    }


    public String putObject(String path, InputStream is){
        if(profile.equals("dev")) {
            path="dev/"+path;
        }
//        System.out.println(profile.equals("dev"));
        oss.putObject(bucketName, path, is);
        return urlPre+path;
    }

    public void shutdown(){
        oss.shutdown();
    }

}