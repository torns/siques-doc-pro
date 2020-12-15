package cn.siques.backend.service.Impl;


import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.service.ValidateCodeService;
import cn.siques.backend.template.RedisRepository;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author : heshenghao
 * @date : 20:36 2020/12/4
 */
@Service
@Slf4j
public class ValidateCodeServiceImpl implements ValidateCodeService {

    @Autowired
    private RedisRepository redisRepository;



    /**
     * 保存手机验证码，与手机号绑定
     *
     * @param deviceId 客户端生成
     * @param imageCode 验证码信息
     */
    @Override
    public void savePhoneCode(String deviceId, String imageCode) {
        redisRepository.setExpire(buildKey(deviceId),imageCode,300);
    }

    @Override
    public boolean validate( String deviceId, String validCode) {
        return validCode.equals(getCode(deviceId));
    }


    /**
     *
     * @param deviceId 前端唯一标识/手机号
     */
    public String getCode(String deviceId) {
        return (String)redisRepository.get(buildKey(deviceId));
    }


    /**
     * 删除验证码
     * @param deviceId 前端唯一标识/手机号
     */
    public void remove(String deviceId) {
        redisRepository.del(buildKey(deviceId));
    }


    private String buildKey(String deviceId) {
        return  "DEFAULT_CODE_KEY:" + deviceId;
    }
}
