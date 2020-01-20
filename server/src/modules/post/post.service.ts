import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryBuilder } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from 'src/core/interface/list-options.interface';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async beforeTag(tags: Partial<Tag>[]) {
    const _tags = tags.map(async item => {
      const { id, name } = item;
      if (id) {
        const _tag = await this.tagRepository.findOne(id);
        if (_tag) {
          return _tag;
        }
        return;
      }

      if (name) {
        const _tag = await this.tagRepository.findOne({ name });

        if (_tag) {
          return _tag;
        }
        return await this.tagRepository.save(item);
      }
    });
    return Promise.all(_tags);
  }

  async store(data: PostDto, user: User) {
    const { tags } = data;
    if (tags) {
      data.tags = await this.beforeTag(tags);
    }
    const entity = await this.postRepository.create(data);
    await this.postRepository.save({
      ...entity,
      user,
    });
    return entity;
  }

  // 根据集合id查文章
  async showPost(id: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .where('collectionId=:id', { id })
      .getMany();
  }

  async index(options: ListOptionsInterface, id: number) {
    const { categories, tags, page, limit, sort, order } = options;
    const queryBuilder = await this.postRepository.createQueryBuilder('post');
    // 添加两个关系relation
    // queryBuilder.leftJoinAndSelect('post.user', 'user');
    queryBuilder.leftJoinAndSelect('post.category', 'category');
    queryBuilder.leftJoinAndSelect('post.collection', 'collection');
    queryBuilder.leftJoinAndSelect('post.tags', 'tag');

    // where筛选
    if (categories) {
      queryBuilder.where('category.alias IN(:...categories)', { categories });
    }

    if (tags) {
      queryBuilder.andWhere('tag.name IN(:...tags)', { tags });
    }
    queryBuilder.where('post.userId=:id', { id });
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
    const { categories, tags, page, limit, sort, order } = options;
    const queryBuilder = await this.postRepository.createQueryBuilder('post');
    // 添加两个关系relation

    queryBuilder.leftJoinAndSelect('post.category', 'category');
    queryBuilder.leftJoinAndSelect('post.tags', 'tag');
    queryBuilder.innerJoinAndSelect('post.user', 'user');

    // where筛选
    if (categories) {
      queryBuilder.where('category.alias IN(:...categories)', { categories });
    }

    if (tags) {
      queryBuilder.andWhere('tag.name IN(:...tags)', { tags });
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

  async show(id: string) {
    const queryBuilder = await this.postRepository.createQueryBuilder('post');

    queryBuilder.addSelect('post.body');
    queryBuilder.innerJoinAndSelect('post.user', 'user');

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

    const entities = await queryBuilder.getOne();
    // 文章不属于自己才增加浏览量

    await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .where('post.id =:id', { id })
      .set({ views: () => 'views + 1' })
      .execute();

    return entities;
  }

  async update(id: string, data: Partial<PostDto>) {
    const { tags } = data;
    delete data.tags;

    await this.postRepository.update(id, data);
    //如果修改的是body才执行
    if (data.body) {
      await this.postRepository
        .createQueryBuilder()
        // .addSelect('post.body')
        .update(Post)
        .where('post.id=:id', { id })
        //截取一部分的数据
        .set({ alias: data.body.substring(0, 100) })
        .execute();
    }
  }

  async delete(id: string) {
    const res = await this.postRepository.delete(id);
    return res;
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

  // async liked_posts(id: number) {

  //   return await this.postRepository
  //     .createQueryBuilder("post")
  //     .where('post.id = :id', { id })
  //     .leftJoinAndSelect("post.likes", "likes")
  //     .innerJoinAndSelect("post.user", "user")
  //     .getMany()

  // }
  async getbody() {
    const querryBuilder = await this.postRepository.createQueryBuilder('post');

    querryBuilder.addSelect('post.body');

    const entity = querryBuilder.getOne();
    return entity;
  }
}
