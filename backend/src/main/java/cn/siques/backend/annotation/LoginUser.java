package cn.siques.backend.annotation;

import java.lang.annotation.*;

/**
 * 获取登录用户信息
 * @author : heshenghao
 * @date : 14:38 2020/12/10
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface LoginUser {
}
