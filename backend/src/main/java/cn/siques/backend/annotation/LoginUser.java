package cn.siques.backend.annotation;

import java.lang.annotation.*;

/**
 * @author : heshenghao
 * @date : 14:38 2020/12/10
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface LoginUser {
}
