package cn.siques.backend.entity;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

/**
 * @author : heshenghao
 * @date : 2:23 2021/1/10
 */
@Data
@Builder
public class OssSecurity {
   private String accessKeyId;
    private String  accessKeySecret;
    private String   securityToken;
    private Date expiration;
}
