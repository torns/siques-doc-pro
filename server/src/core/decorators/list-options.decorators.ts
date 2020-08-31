import { createParamDecorator, Query } from '@nestjs/common';
import { ListOptionsInterface } from '../interface/list-options.interface';
//导出一个参数装饰器@user()=req.user
export const ListOptions = createParamDecorator(
  (data: Partial<ListOptionsInterface> = {}, req) => {
    let {
      categories,
      tags,
      taglist,
      listId,
      collection,
      type,
      page,
      limit,
      sort,
      order,
      random,
      avator,
    } = req.query;
    console.log(req.query);
    // console.log(data); //后台的默认值
    if (categories) {
      categories = categories.split('-');
    }

    // console.log(taglist, tags);
    if (taglist) {
      taglist = taglist.split('-');
    }

    if (tags) {
      tags = tags.split('-');
    }

    if (page) {
      page = parseInt(page);
    } else {
      page = 1; //默认页面
    }

    if (limit) {
      limit = parseInt(limit);
    } else if (limit === undefined && data.limit) {
      limit = data.limit;
    } else {
      limit = 3; //默认限制
    }

    if (sort) {
      sort = sort;
    } else if (sort === undefined && data.sort) {
      sort = data.sort;
    } else {
      sort = 'created';
    }

    if (order) {
      order = order.toUpperCase();
    } else if (order === undefined && data.order) {
      order = data.order;
    } else {
      order = 'DESC';
    }

    return {
      categories,
      tags,
      taglist,
      listId,
      collection,
      page,
      type,
      limit,
      sort,
      order,
      random,
      avator,
    };
  },
);
