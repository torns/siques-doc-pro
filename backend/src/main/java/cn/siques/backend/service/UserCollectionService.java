package cn.siques.backend.service;

import cn.siques.backend.entity.Collection;
import cn.siques.backend.entity.UserCollection;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author : heshenghao
 * @date : 13:05 2020/12/9
 */
public interface UserCollectionService extends IService<UserCollection>  {
    List<Collection> getUserCollection(Long userId);
}
