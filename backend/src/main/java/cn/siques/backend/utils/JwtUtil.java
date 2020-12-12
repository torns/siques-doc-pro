package cn.siques.backend.utils;

import cn.hutool.core.util.StrUtil;
import cn.siques.backend.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.servlet.http.HttpServletRequest;
import java.security.*;
import java.security.interfaces.RSAPrivateCrtKey;
import java.security.spec.RSAPublicKeySpec;


/**
 * @author : heshenghao
 * @date : 22:48 2020/12/9
 */
@Configuration
public class JwtUtil {
    private static RSAPrivateCrtKey privateKey;

    private static PublicKey publicKey;

    public static void signKey()   {
     
        
        try {
            ClassPathResource resource = new ClassPathResource("oauth2.jks");
            KeyStore jks = KeyStore.getInstance("JKS");
            
            jks.load(resource.getInputStream(),"123456".toCharArray());
           privateKey = (RSAPrivateCrtKey)  jks.getKey("oauth2", "123456".toCharArray());
            RSAPublicKeySpec spec = new RSAPublicKeySpec(privateKey.getModulus(), privateKey.getPublicExponent());
              publicKey = KeyFactory.getInstance("RSA").generatePublic(spec);
            
        }catch (Exception e){

        }
    }

    public static String genToken(User user){
        if(privateKey==null){
            signKey();
        }


        return Jwts.builder().setSubject(user.getUsername())
                .signWith(privateKey,SignatureAlgorithm.RS512).compact();
    }

    public String extractJwtFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (StrUtil.isNotBlank(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return null;
    }

    public String extractUsernameFromToken(String token) {
        String username;
        try {
            username = Jwts.parserBuilder()
                    .setSigningKey(publicKey)
                    .build()
                    .parseClaimsJws(token).getBody().getSubject();
        }catch (Exception e){
            System.out.println(e.getMessage());
            username = null;
        }

        return username;
    }
}
