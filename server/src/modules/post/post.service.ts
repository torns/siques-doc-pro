import { Injectable } from '@nestjs/common';
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
  ) { }

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
    queryBuilder.leftJoinAndSelect('post.tags', 'tag');
    // where筛选
    if (categories) {
      queryBuilder.where('category.alias IN(:...categories)', { categories });
    }

    if (tags) {
      queryBuilder.andWhere('tag.name IN(:...tags)', { tags });
    }
    queryBuilder.where('userId=:id', { id })
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
    queryBuilder.innerJoinAndSelect("post.user", "user")

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

    const queryBuilder = await this.postRepository.createQueryBuilder("post")
    queryBuilder.innerJoinAndSelect("post.user", "user")
    queryBuilder.leftJoinAndSelect("user.avator", "avator")

    queryBuilder.where('post.id =:id', { id })

    const entities = await queryBuilder.getOne();
    // 文章不属于自己才增加浏览量

    await this.postRepository.createQueryBuilder()
      .update(Post)
      .where('post.id =:id', { id })
      .set({ views: () => "views + 1" })
      .execute();

    return entities;
  }

  async update(id: string, data: Partial<PostDto>) {
    const { tags } = data;
    delete data.tags;

    await this.postRepository.update(id, data);

    // const entity = await this.postRepository.findOne(id, {
    //   relations: ['category', 'tags'],
    // });
    // if (tags) {
    //   entity.tags = await this.beforeTag(tags);
    // }
    // return await this.postRepository.save(entity);
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

  async liked(id: number) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'liked')
      .of(id)
      .loadMany();
  }
}
