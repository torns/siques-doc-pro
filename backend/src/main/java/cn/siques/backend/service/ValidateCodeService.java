package cn.siques.backend.service;

import java.io.IOException;
import java.util.Map;

/**
 * @author : heshenghao
 * @date : 20:35 2020/12/4
 */
public interface ValidateCodeService {

    /**
     * 保存
     * @param deviceId 前端唯一标识
     * @param imageCode 验证码
     */
    void sendCode(String deviceId, String imageCode);

    /**
     * 验证
     * @param deviceId
     * @param validCode
     * @return boolean
     */
    boolean validateCode(String deviceId, String validCode);


    String oauthGit(Map<String, String> map) throws IOException;
}
