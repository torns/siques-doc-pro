package cn.siques.backend.config;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.siques.backend.service.UserService;
import cn.siques.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author : heshenghao
 * @date : 22:47 2020/12/9
 */
@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String token = jwtUtil.extractJwtFromRequest(request);
        if(StrUtil.isNotEmpty(token)) {
            // 解析token
            String userId = jwtUtil.extractUserIdFromToken(token);
            if(ObjectUtil.isNull(userId)){
                filterChain.doFilter(request,response);
                return;
            }
            UserDetails userDetails = userService.loadUserByUsername(userId);
            UsernamePasswordAuthenticationToken psToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            psToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(psToken);
        }

        filterChain.doFilter(request,response);
    }
}
