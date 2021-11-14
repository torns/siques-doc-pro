package cn.siques.backend.service.Impl;

import cn.siques.backend.dao.UserDao;
import cn.siques.backend.entity.User;
import cn.siques.backend.service.UserService;
import cn.siques.backend.dto.model.JwtUserDetails;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/**
 * @author : heshenghao
 * @date : 13:07 2020/12/9
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userDao.selectOne(new QueryWrapper<User>().eq("id", id));
        JwtUserDetails details = JwtUserDetails.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword()).build();

        return details;
    }
}
