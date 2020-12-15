package cn.siques.backend.service;

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
    void savePhoneCode(String deviceId, String imageCode);

    /**
     * 验证
     * @param deviceId
     * @param validCode
     * @return boolean
     */
    boolean validate(String deviceId, String validCode);
}
