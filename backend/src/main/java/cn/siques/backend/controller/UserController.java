package cn.siques.backend.controller;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.dto.LoginDto;
import cn.siques.backend.entity.User;
import cn.siques.backend.service.UserService;
import cn.siques.backend.utils.JwtUtil;
import cn.siques.backend.utils.model.JwtUserDetails;
import cn.siques.backend.utils.model.Result;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;

/**
 * @author : heshenghao
 * @date : 14:23 2020/12/9
 */
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {


    private UserService userService;

    private PasswordEncoder passwordEncoder;

    @PostMapping
    public Result save(@RequestBody User user){
        if(ObjectUtils.isEmpty(user.getId())){
            user.setPassword(passwordEncoder.encode("123456"));
        }
        boolean b = userService.saveOrUpdate(user);
        return Result.succeed(b);
    }


    @PostMapping("/login")
    public Result login(@RequestBody LoginDto loginDto, HttpServletRequest request){
        User user = userService.getOne(new QueryWrapper<User>().eq("username",loginDto.getLoginCode())
                .or().eq("phoneNumber",loginDto.getLoginCode()));
        if (ObjectUtil.isEmpty(user)){
           return Result.failed("用户不存在");
        }

        if(!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())){
            return Result.failed("账号或密码不正确");
        }

        String token = JwtUtil.genToken(user);

        JwtUserDetails userDetails = (JwtUserDetails) userService.loadUserByUsername(user.getUsername());
        userDetails.setToken(token);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        return Result.succeed(authenticationToken);

    }


}
