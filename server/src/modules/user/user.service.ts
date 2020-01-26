import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Entity, createQueryBuilder, QueryBuilder } from 'typeorm';
import { UserDto, UpdatePasswordDto } from './user.dto';
import { Post } from '../post/post.entity';
import { UserTagDto } from '../tag/tag.dto';
import { throwError } from 'rxjs';
import { Avator } from '../avator/avator.entity';
import { Collection } from '../collection/collection.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Avator)
    private readonly avatorRepository: Repository<Avator>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}
  async store(data: UserDto) {
    const { phonenumber } = data;
    const user = await this.userRepository.findOne({ phonenumber });
    if (user) {
      throw new BadRequestException('用户已存在');
    }
    const res = await this.userRepository.create(data);
    await this.userRepository.save(res);

    const avatorData = {
      user: res,
    };
    const res2 = await this.avatorRepository.create(avatorData);
    await this.avatorRepository.save(res2);
    return res;
  }

  async show(id: number) {
    const entity = await this.userRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('未找到用户');
    }
    const querryBuilder = this.userRepository.createQueryBuilder('user');
    const result = await querryBuilder
      .where('user.id =:id', { id })
      .leftJoinAndSelect('user.avator', 'avator')
      .select(['user.id', 'avator.id', 'avator.url'])
      .orderBy('avator.id', 'DESC')
      // .limit(1)
      .getOne();

    const user = {
      ...entity,
      avator: result.avator ? result.avator : null,
    };

    return user;
  }

  async showMessage(id: number) {
    const res1 = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id })
      .leftJoin('user.follows', 'follows')
      .addSelect(['follows.name', 'follows.id'])
      .leftJoin('user.interest', 'interest')
      .addSelect('interest.id')
      .leftJoinAndSelect('user.avator', 'avator')
      .leftJoin('user.tags', 'tags')
      .addSelect(['tags.id'])
      .leftJoin('user.posts', 'posts')
      .addSelect(['posts.id'])
      .addOrderBy('avator.id', 'DESC')
      .getOne();

    //粉丝
    const res2 = await this.userRepository.findOne(id, {
      relations: ['follows', 'user', 'user.avator'],
    });

    return { ...res1, ...res2 };
  }

  //传入的用户id,用户点过赞的文章
  async userliked(id: number) {
    const res = await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'user')
      .of(id)
      .loadMany();
    return res;
  }

  async updataPassword(id: string, data: UpdatePasswordDto) {
    const { password, newpassword } = data;
    const entity = await this.userRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没找到用户');
    }

    const pass = await entity.comparePassword(password);
    if (!pass) {
      throw new BadRequestException('密码验证失败，请重新输入');
    }

    entity.password = newpassword;
    return await this.userRepository.save(entity);
  }

  async findByName(phonenumber: string, password?: boolean) {
    const querryBuilder = await this.userRepository.createQueryBuilder('user');
    querryBuilder
      .where('user.phonenumber = :phonenumber', { phonenumber })
      .leftJoinAndSelect('user.roles', 'roles');

    if (password) {
      querryBuilder.addSelect('user.password');
    }
    const entity = querryBuilder.getOne();
    return entity;
  }

  //更新用户
  async update(id: number, data: UserDto) {
    const entity = await this.userRepository.update(id, data);
  }

  //检查用户是否有资源权限
  async possess(id: number, resource: string, resourceId: number) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoin(`user.${resource}`, resource)
      .andWhere(`${resource}.id=:resourceId`, { resourceId })
      .getCount();

    // console.log(id, resource, resourceId)
    return result === 1 ? true : false;
  }

  //改变编辑器
  async changeEditor(id: number, body) {
    const { editor } = body;

    const entity = await this.userRepository.findOne(id);

    entity.editor = editor;
    // 这里用更新才行？
    return await this.userRepository.update(id, entity);
  }

  //用户关注专栏和消除 id是文章id
  async interest(id: number, user: User) {
    try {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'interest')
        .of(user)
        .add(id);

      await this.collectionRepository
        .createQueryBuilder()
        .update(Collection)
        .where('collection.id =:id', { id })
        .set({ interest: () => 'interest + 1' })
        .execute();
    } catch {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'interest')
        .of(user)
        .remove(id);

      await this.collectionRepository
        .createQueryBuilder()
        .update(Collection)
        .where('collection.id =:id', { id })
        .set({ interest: () => 'interest - 1' })
        .execute();
    }
  }

  //点赞和消除 id是文章id
  async like(id: number, user: User) {
    try {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'likes')
        .of(user)
        .add(id);

      await this.postRepository
        .createQueryBuilder()
        .update(Post)
        .where('post.id =:id', { id })
        .set({ liked: () => 'liked + 1' })
        .execute();
      return true;
    } catch {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'likes')
        .of(user)
        .remove(id);

      await this.postRepository
        .createQueryBuilder()
        .update(Post)
        .where('post.id =:id', { id })
        .set({ liked: () => 'liked - 1' })
        .execute();
      return false;
    }
  }
  // 被谁点过数量 给的是postid
  // leftjoin就是把符合的数据返回
  //leftJoinandselect就是会把符合的数据以及子表的数据带出来
  async countliked(id: number) {
    // 这里要给postid

    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.likes', 'likes')
      .where('postId=:id', { id })
      .getMany();
    return res.length;
  }

  // 给哪些文章点过赞 id:用户
  async liked(id: number) {
    const res = await this.userRepository.findOne(id, {
      relations: ['likes', 'likes.user'],
    });

    return res;
  }

  // 用户之间关注
  async follow(userid1: number, userid2: number) {
    if (userid1 != userid2) {
      const res = await this.userRepository
        .createQueryBuilder('user')
        .relation(User, 'follows')
        .of(userid1)
        .add(userid2);
    } else {
      return;
    }
  }

  //用户擅长技能

  async skill(userId: number, tag: UserTagDto) {
    await this.userRepository
      .createQueryBuilder('user')
      .relation(User, 'skill')
      .of(userId)
      .remove(tag);

    await this.userRepository
      .createQueryBuilder('user')
      .relation(User, 'skill')
      .of(userId)
      .add(tag);
  }

  async deleteSkill(userId: number, id: number) {
    await this.userRepository
      .createQueryBuilder('user')
      .relation(User, 'skill')
      .of(userId)
      .remove(id);
  }

  async fetchSkill(userId: number) {
    return (
      await this.userRepository,
      createQueryBuilder('user')
        .relation(User, 'skill')
        .of(userId)
        .loadMany()
    );
  }

  //关注了谁
  async getfollows(id) {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.follows', 'follows')
      .leftJoin('follows.avator', 'avator')
      .addSelect('avator.url')
      .where('user.id=:id', { id })
      .getMany();

    return res;
  }
  // 用户的粉丝,以及他们的头像
  async whofollows(id) {
    // console.log(id)
    const res = await this.userRepository.findOne(id, {
      relations: ['follows', 'user', 'user.avator'],
    });

    return res;
  }
}
