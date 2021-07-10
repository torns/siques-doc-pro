package cn.siques.backend.service.Impl;

import cn.hutool.core.util.ObjectUtil;
import cn.siques.backend.dao.CollectionDocDao;
import cn.siques.backend.dao.DocDao;
import cn.siques.backend.dao.DocHistoryDao;
import cn.siques.backend.entity.CollectionDoc;
import cn.siques.backend.entity.Doc;
import cn.siques.backend.entity.DocHistory;
import cn.siques.backend.service.DocHistoryService;
import cn.siques.backend.service.DocService;
import cn.siques.backend.utils.RegexUtils;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author : heshenghao
 * @date : 13:07 2020/12/9
 */
@Service
public class DocHistoryServiceImpl extends ServiceImpl<DocHistoryDao, DocHistory> implements DocHistoryService {


}
