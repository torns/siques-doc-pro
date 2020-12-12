package cn.siques.backend.service;

import cn.siques.backend.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @author : heshenghao
 * @date : 13:05 2020/12/9
 */
public interface UserService extends IService<User>, UserDetailsService {
}
