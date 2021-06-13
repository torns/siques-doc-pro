package cn.siques.backend.controller;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.dto.LoginDto;
import cn.siques.backend.entity.*;
import cn.siques.backend.service.*;
import cn.siques.backend.utils.AuthenticateUtil;
import cn.siques.backend.utils.JwtUtil;
import cn.siques.backend.utils.model.JwtUserDetails;
import cn.siques.backend.utils.model.Result;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;

import lombok.val;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author : heshenghao
 * @date : 14:23 2020/12/9
 */
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private CollectionDocService collectionDocService;
    private UserCollectionService userCollectionService;
    private  DocService docService;
    private CollectionService collectionService;
    private UserService userService;

    private PasswordEncoder passwordEncoder;

    private ValidateCodeService validateCodeService;

    @PostMapping
    public Result save(@RequestBody User user){
        if(ObjectUtils.isEmpty(user.getId())){
            user.setPassword(passwordEncoder.encode("123456"));
        }
        boolean b = userService.saveOrUpdate(user);
        return Result.succeed(b);
    }

    /**
     * 手机验证码登录
     * @return
     */
    @PostMapping("/login/code")
    public Result codeLogin(@RequestBody LoginDto loginDto,HttpServletRequest request){

        String phoneNum = loginDto.getPhoneNumber();
        String verifyCode = loginDto.getVerification();

        User user = userService.getOne(new QueryWrapper<User>()
                        .eq("phoneNumber",phoneNum));

        if(validateCodeService.validate(phoneNum,verifyCode)){

            /** 用户是否已经存在过*/
            if(ObjectUtil.isNull(user) ){
                User u = new User();
                u.setUsername("趣友"+loginDto.getPhoneNumber().hashCode());
                u.setPhoneNumber(loginDto.getPhoneNumber());
                u.setPassword(passwordEncoder.encode(String.valueOf(loginDto.getPhoneNumber().hashCode())));
                userService.save(u);
                Collection collection = new Collection();
                collection.setName("产品研发");
                collection.setDescription("为产品团队提供创造力");
                collectionService.save(collection);

                userCollectionService.save(new UserCollection(u.getId(),collection.getId()));

                Doc doc = new Doc();
                doc.setTitle("开始写作吧");
                doc.setBody("开始愉快写作吧");
                docService.save(doc);
                collectionDocService.save(new CollectionDoc(collection.getId(),doc.getId()));

                return Result.succeed(JwtUtil.authenticate(u, request, userService));
            }else{
                return Result.succeed(JwtUtil.authenticate(user, request, userService));
            }

        }else{
            return Result.failed("验证码不正确");
        }
    }

    /**
     * 账号密码登录
     * @param loginDto
     * @param request
     * @return
     */
    @PostMapping("/login")
    public Result login(@RequestBody LoginDto loginDto, HttpServletRequest request){
        User user = userService.getOne(new QueryWrapper<User>().eq("username",loginDto.getPhoneNumber()));

        if (ObjectUtil.isEmpty(user)){
           return Result.failed("用户不存在");
        }

        if(!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())){
            return Result.failed("账号或密码不正确");
        }

        UsernamePasswordAuthenticationToken authenticate = JwtUtil.authenticate(user, request, userService);


        return Result.succeed(authenticate);
    }

    @GetMapping("verify")
    public Result verify(@RequestParam String phoneNumber){

       return Result.succeed(AuthenticateUtil.sendVerificationCode(phoneNumber, validateCodeService));
    }


}
