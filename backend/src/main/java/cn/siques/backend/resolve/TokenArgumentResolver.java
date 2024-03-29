package cn.siques.backend.resolve;

import cn.siques.backend.annotation.LoginUser;
import cn.siques.backend.dto.model.JwtUserDetails;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * @author : heshenghao
 * @date : 14:37 2020/12/10
 */
public class TokenArgumentResolver  implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.hasParameterAnnotation(LoginUser.class);
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {


        JwtUserDetails principal = null;
        // 已认证过的状态
        if(!(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String)){
              principal = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }



        return principal;
    }
}
