package cn.siques.backend.dto;

import lombok.Data;

/**
 * @author : heshenghao
 * @date : 21:22 2020/12/9
 */
@Data
public class LoginDto {
    String phoneNumber;
    String userName;
    String password;
    String verification;
}
