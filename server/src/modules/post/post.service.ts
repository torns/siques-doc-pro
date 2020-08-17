import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryBuilder } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from 'src/core/interface/list-options.interface';
import { Tag } from '../tag/tag.entity';
import { Collection } from '../collection/collection.entity';
import { Comment } from '../comment/comment.entity';
import { throwError } from 'rxjs';
import { exception } from 'console';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async beforeTag(tags: Partial<Tag>[], postId: any) {
    tags.map(async e => {
      try {
        await this.tagRepository
          .createQueryBuilder()
          .relation(Post, 'tags')
          .of(postId)
          .add(e.id);
      } catch {
        return;
      }
    });
  }

  async store(data: PostDto, user: User) {
    const { tags, collection, type } = data;

    let isPublished = 0;
    // 笔记与问题都设置为直接发布
    if (type == 'note' || type == 'question') {
      isPublished = 1;
    }
    const entity = await this.postRepository.create(data);
    const res = await this.postRepository.save({
      ...entity,
      user,
      isPublished,
      type,
    });

    if (tags) {
      await this.beforeTag(tags, entity.id);
    }

    if (type === 'post') {
      await this.collectionRepository
        .createQueryBuilder()
        .update(collection)
        .where('collection.id=:collection', { collection })
        .set({ amount: () => 'amount + 1' })
        .execute();
    }
    return res;
  }

  // 根据集合id查文章
  async showPost(id: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .where('collectionId=:id', { id })
      .orderBy('post.created', 'DESC')
      .getMany();
  }

  // 展示用户笔记
  async showUserNote(id: number) {
    const type = 'note';
    const collect = null;
    const res = await this.postRepository
      .createQueryBuilder('post')
      .where('post.userId=:id', { id })
      .andWhere('post.type=:type', { type })

      // .where('post.collection=null')
      .getMany();

    return res;
  }

  async index(options: ListOptionsInterface, id: number) {
    const { categories, tags, type, page, limit, sort, order } = options;
    const queryBuilder = await this.postRepository.createQueryBuilder('post');
    // 添加两个关系relation
    // queryBuilder.leftJoinAndSelect('post.user', 'user');

    queryBuilder.leftJoinAndSelect('post.collection', 'collection');
    queryBuilder.leftJoinAndSelect('post.tags', 'tag');

    // where筛选

    if (tags) {
      queryBuilder.andWhere('tag.name IN(:...tags)', { tags });
    }
    queryBuilder.where('post.userId=:id', { id });

    if (type) {
      queryBuilder.where('post.type=:type', { type });
    }

    queryBuilder.andWhere('post.isPublished=1');
    // 限制查询数量
    queryBuilder.take(limit).skip(limit * (page - 1));
    //获取结果以及数量

    // 排序
    queryBuilder.orderBy({
      // ASC升序 DESC降序
      // "post.created":"DESC"
      [`post.${sort}`]: order,
    });

    const entities = queryBuilder.getManyAndCount();
    return entities;
  }

  //获取主页文章列表
  async getAll(options: ListOptionsInterface) {
    const {
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
    } = options;
    // console.log(sort, tags, categories, taglist, type);
    const queryBuilder = await this.postRepository.createQueryBuilder('post');
    // 添加两个关系relation

    queryBuilder.addSelect('post.cover');
    queryBuilder.leftJoinAndSelect('post.tags', 'tag');
    queryBuilder.leftJoinAndSelect('tag.taglist', 'taglist');
    queryBuilder.innerJoinAndSelect('post.user', 'user');

    // where筛选

    if (tags) {
      queryBuilder.andWhere('tag.name IN(:...tags)', { tags });
    }

    if (taglist && !listId) {
      queryBuilder.andWhere('taglist.alias IN(:...taglist)', { taglist });
    }

    if (taglist && listId) {
      queryBuilder.andWhere('tag.id IN(:...taglist)', { taglist });
    }
    if (type) {
      queryBuilder.where('post.type = :type', { type });
      // 查询已经发布的
      console.log(type);
      if (type == 'post') {
        queryBuilder.andWhere('post.isPublished =1');
      }
    }

    if (collection) {
      queryBuilder.innerJoinAndSelect('post.collection', 'collection');
    }

    // 限制查询数量
    queryBuilder.take(limit).skip(limit * (page - 1));

    //获取结果以及数量

    // 排序
    queryBuilder.orderBy({
      // ASC升序 DESC降序

      [`post.${sort}`]: order,
    });

    const entities = queryBuilder.getManyAndCount();

    return entities;
  }
  // 计算关注数
  async calcuConcern(postId: string) {
    const res = await this.postRepository
      .createQueryBuilder('post')
      .relation(Post, 'concern')
      .of(postId)
      .loadMany();
    return res.length;
  }

  async show(id: string, query: any) {
    const concern = await this.calcuConcern(id);
    // console.log({ concern: concern });
    const queryBuilder = await this.postRepository.createQueryBuilder('post');

    queryBuilder.addSelect('post.body');
    queryBuilder.innerJoinAndSelect('post.user', 'user');

    try {
      queryBuilder
        .leftJoin('post.adoptAnswer', 'adoptAnswer')
        .addSelect(['adoptAnswer.id']);
    } catch {}

    queryBuilder.leftJoinAndSelect('user.interest', 'interest');

    const { collection, type } = query;

    if (collection) {
      queryBuilder
        .innerJoin('post.collection', 'collection')
        .addSelect(['collection.id']);
    }

    // queryBuilder.leftJoinAndSelect("post.comments", "comments")
    // queryBuilder.leftJoinAndSelect("comments.user", "commentUser")

    // queryBuilder.leftJoinAndSelect("commentUser.avator", "commentUserAvator")
    //   .orderBy("comments.created", "DESC")
    queryBuilder
      .leftJoinAndSelect('user.avator', 'avator')
      .addOrderBy('avator.created', 'DESC');

    queryBuilder
      .leftJoin('post.tags', 'tags')
      .addSelect(['tags.id', 'tags.name']);

    queryBuilder.where('post.id =:id', { id });

    if (type !== 'edit' && type !== 'note' && type !== 'question') {
      queryBuilder.andWhere('post.isPublished =1');
    }

    const entities = await queryBuilder.getOne();

    const number = Math.random() * 3;

    if (type !== 'edit' && number > 2) {
      await this.postRepository
        .createQueryBuilder()
        .update(Post)
        .where('post.id =:id', { id })
        .set({ views: () => 'views + 1' })
        .execute();
    }

    try {
      entities.concerned = concern;
    } catch {
      return new NotFoundException();
    }

    return entities;
  }

  async update(id: string, data: Partial<PostDto>) {
    const { tags } = data;
    delete data.tags;

    await this.postRepository.update(id, data);
    //如果修改的是body才执行

    if (data.body) {
      let reg = /[\\\`\*\_\[\]\#\+\-\!\>]/g;
      // 匹配封面链接
      let reg1 = /(?<=\!\[.*\]\()(.+)(?=\))/;

      let reg2 = /^[^?]+/;
      let url: any;
      try {
        if (
          data.body
            .match(reg1)[1]
            .match(reg2)
            .toString()
            .includes('gif')
        ) {
          url = data.body.match(reg1)[1].match(reg2);
        } else {
          url =
            data.body.match(reg1)[1].match(reg2) +
            '?x-oss-process=style/' +
            'cover-picture';
        }
      } catch {
        url = null;
      }

      const body = data.body.replace(reg, '');
      await this.postRepository
        .createQueryBuilder()
        // .addSelect('post.body')
        .update(Post)
        .where('post.id=:id', { id })
        //截取一部分的数据

        .set({ cover: url, alias: body.substring(0, 70), updated: new Date() })
        .execute();
    }
  }
  // 采纳答案

  async adoptAnswer(postId: number, commentId: number) {
    const entity = await this.commentRepository.findOne(commentId);
    const post = await this.postRepository.findOne(postId);
    post.adoptAnswer = entity;
    await this.postRepository.save(post);
  }

  async delete(id: string, collectionId: number) {
    await this.postRepository.delete(id);

    if (collectionId) {
      await this.collectionRepository
        .createQueryBuilder()
        .update(Collection)
        .where('collection.id=:collectionId', { collectionId })
        .set({ amount: () => 'amount - 1' })
        .execute();
    }
  }

  async vote(id: number, user: User) {
    await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .add(id);
  }

  async unvote(id: number, user: User) {
    await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .remove(id);
  }

  //点赞和消除
  async like(id: number, user: User) {
    try {
      await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(id)
        .add(user);
    } catch {
      await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(id)
        .remove(user);
    }
  }

  // 被谁点过数量
  async countliked(id: number) {
    const res = await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'likes')
      .of(id)
      .loadMany();

    return res.length;
  }
  // 被谁点过赞
  async liked(id: number) {
    const res = await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'likes')
      .of(id)
      .loadMany();
    return res;
  }

  async getbody() {
    const querryBuilder = await this.postRepository.createQueryBuilder('post');

    querryBuilder.addSelect('post.body');

    const entity = querryBuilder.getOne();
    return entity;
  }

  async serchData(searchKey: any) {
    const res1 = await this.postRepository
      .createQueryBuilder('post')

      .where('post.title Like :param')
      .setParameters({
        param: '%' + searchKey + '%',
      })
      .orderBy('post.liked', 'ASC')
      .getMany();

    const res2 = await this.postRepository
      .createQueryBuilder('post')

      .where('post.body Like :param')
      .setParameters({
        param: '%' + searchKey + '%',
      })
      .orderBy('post.liked', 'ASC')
      .getMany();

    function arrayNonRepeatfy(arr) {
      let map = new Map();
      let array = new Array(); // 数组用于返回结果
      for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i].id)) {
          // 如果有该key值,说明前面已经遇到过
          map.set(arr[i].id, true);
        } else {
          map.set(arr[i].id, false); // 如果没有该key值，可以把他push进去
          array.push(arr[i]);
        }
      }

      return array;
    }
    let res = arrayNonRepeatfy([...res1, ...res2]);
    res = [res, res.length];
    return res;
  }

  async getSitemap() {
    const type = 'post';
    const type1 = 'note';
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.type=:type', { type })
      .andWhere('post.isPublished=1')
      .getMany();

    // 笔记本不在推送到百度
    // const note = await this.postRepository
    //   .createQueryBuilder('post')
    //   .where('post.type=:type1', { type1 })
    //   .getMany();

    let idList = [];

    post.map(e => {
      idList.push({ type: 'p', id: e.id });
    });
    // note.map(e => {
    //   idList.push({ type: 'n', id: e.id });
    // });

    return idList;
  }
}
