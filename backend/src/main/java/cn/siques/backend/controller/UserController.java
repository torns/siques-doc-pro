package cn.siques.backend.controller;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.dto.LoginDto;
import cn.siques.backend.entity.*;
import cn.siques.backend.service.*;
import cn.siques.backend.utils.JwtUtil;
import cn.siques.backend.utils.PhoneCodeUtil;
import cn.siques.backend.utils.model.CodeEnum;
import cn.siques.backend.utils.model.Result;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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



    /**
     * 手机验证码登录
     * @return
     */
    @PostMapping("/login")
    public Result codeLogin(@RequestBody LoginDto loginDto,HttpServletRequest request){

        String phoneNum = loginDto.getPhoneNumber();
        String verifyCode = loginDto.getVerification();
        String username = loginDto.getUsername();

        User user = userService.getOne(new QueryWrapper<User>()
                        .eq("phone_number",phoneNum));

        if(validateCodeService.validate(phoneNum,verifyCode)){

            /** 用户是否已经注册*/
            if(ObjectUtil.isNull(user) ){
                User u = new User();
                // 用户名不为空直接设置
                if(!StringUtils.isEmpty(username)){
                    u.setUsername(username);
                }else {
                    u.setUsername("趣友"+phoneNum.hashCode());
                }

                u.setPhoneNumber(phoneNum);
                u.setPassword(passwordEncoder.encode(String.valueOf(phoneNum.hashCode())));
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
                // 用户已经注册
                return Result.succeed(JwtUtil.authenticate(user, request, userService));
            }

        }else{
            return Result.failed("验证码不正确");
        }
    }


    @GetMapping("/exist")
    public Result checkExist(@RequestParam String phoneNumber){

        User user = userService.getOne(new QueryWrapper<User>().eq("phone_number", phoneNumber));
        if(ObjectUtils.isEmpty(user)){
            return Result.succeed(CodeEnum.USER_NOT_EXIST);
        }
        return Result.succeed(CodeEnum.USER_EXIST);
    }


    /**
     * 发送短信，没有防护措施
     * @param phoneNumber
     * @return
     */
    @GetMapping("/login/sendCode")
    public Result sendCode(@RequestParam String phoneNumber){
       return Result.succeed(PhoneCodeUtil.sendVerificationCode(phoneNumber, validateCodeService));
    }


}
