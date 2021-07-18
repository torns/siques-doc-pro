package cn.siques.backend.config;


import cn.siques.backend.utils.model.OssSecurity;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.auth.sts.AssumeRoleRequest;
import com.aliyuncs.auth.sts.AssumeRoleResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author : heshenghao
 * @date : 21:02 2020/10/23
 */
@Component
public class OssFactory {
    @Value("${spring.oss.endpoint}")
    protected String endpoint;

    @Value("${spring.oss.stsEndpoint}")
    protected String stsEndpoint;

    @Value("${spring.oss.urlPre}")
    protected String urlPre;

    @Value("${spring.oss.accessKeyId}")
    protected String accessKeyId;

    @Value("${spring.oss.stsAccessKeyId}")
    protected String stsAccessKeyId;

    @Value("${spring.oss.accessKeySecret}")
    protected String accessKeySecret;

    @Value("${spring.oss.stsAccessKeySecret}")
    protected String stsAccessKeySecret;

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
         oss.putObject(bucketName, path, is);

        return urlPre+path;
    }


    public OssSecurity getSts(Long id){

        String roleArn = "acs:ram::1933223076961134:role/siques-user";
        String roleSessionName = "web-client";
        String policy = "{\n" +
                "    \"Version\": \"1\",\n" +
                "    \"Statement\": [\n" +
                "        {\n" +
                "            \"Effect\": \"Allow\",\n" +
                "            \"Action\": \"oss:ListObjects\",\n" +
                "            \"Resource\": \"acs:oss:*:*:shuxie\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"Effect\": \"Allow\",\n" +
                "            \"Action\": [\n" +
                "                \"oss:*\"\n" +
                "            ],\n" +
                "            \"Resource\": [\n" +
                "                \"acs:oss:*:*:shuxie/post/"+id+"/*\"\n" +
                "            ]\n" +
                "        }\n" +
                "    ]\n" +
                "}";
        try {
            // 添加endpoint（直接使用STS endpoint，前两个参数留空，无需添加region ID）
            DefaultProfile.addEndpoint("", "", "Sts", stsEndpoint);
            // 构造default profile（参数留空，无需添加region ID）
            IClientProfile profile = DefaultProfile.getProfile("", stsAccessKeyId, stsAccessKeySecret);
            // 用profile构造client
            DefaultAcsClient client = new DefaultAcsClient(profile);
            final AssumeRoleRequest request = new AssumeRoleRequest();
            request.setMethod(MethodType.POST);
            request.setRoleArn(roleArn);
            request.setRoleSessionName(roleSessionName);
            request.setPolicy(policy); // 若policy为空，则用户将获得该角色下所有权限
            request.setDurationSeconds(3000L); // 设置凭证有效时间
            final AssumeRoleResponse res = client.getAcsResponse(request);

            AssumeRoleResponse.Credentials credentials = res.getCredentials();
            OssSecurity build = OssSecurity.builder().accessKeyId(credentials.getAccessKeyId())
                    .accessKeySecret(credentials.getAccessKeySecret()).expiration(
                            convertTime(credentials.getExpiration())  )
                    .securityToken(credentials.getSecurityToken()).build();
            return build;
        } catch (ClientException e) {
            System.out.println("Failed：");
            System.out.println("Error code: " + e.getErrCode());
            System.out.println("Error message: " + e.getErrMsg());
            System.out.println("RequestId: " + e.getRequestId());
        }
        return null;
    }

    /**
     * UTC时间转换为当地时间
     *
     * @param utcTime UTC时间
     * @return 北京时间
     */
    private static Date convertTime(String utcTime)   {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");


        Date date = null;
        try {
            date = df.parse(utcTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR, calendar.get(Calendar.HOUR) + 8);

        return  calendar.getTime();
    }
}