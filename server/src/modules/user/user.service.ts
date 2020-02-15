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
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { Notification } from '../notification/notification.entity';
import { ThirdpartService } from '../thirdpart/thirdpart.service';
import { ThirdPart } from '../thirdpart/third.entity';

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
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(ThirdPart)
    private readonly thirdRepository: Repository<ThirdPart>,
  ) {}
  async store(data: UserDto) {
    const { phonenumber, uid } = data;
    const user = await this.userRepository.findOne({ phonenumber });
    if (user) {
      throw new BadRequestException('手机号已被注册');
    }

    const res = await this.userRepository.create(data);
    delete res.id;
    const newUser = await this.userRepository.save(res);

    if (uid) {
      const entity = await this.thirdRepository
        .createQueryBuilder('third')
        .where('third.uid=:uid', { uid })
        .getOne();
      if (entity) {
        await this.userRepository
          .createQueryBuilder()
          .relation(User, 'thirdpart')
          .of(newUser)
          .add(entity);
      } else {
        throw new BadRequestException('请重新拉取信息');
      }
    }

    this.userInit(newUser.id, newUser);

    return res;
  }

  // 用户注册结束通知
  async userInit(userId: number, user: User) {
    const avatorData = {
      user: user,
    };
    const res1 = await this.avatorRepository.create(avatorData);
    await this.avatorRepository.save(res1);

    const content = 'Congradulations!!! 欢迎加入思趣大家庭';
    const type = 'userinit';
    await this.notificationRepository.save({
      to_uid: user,
      type,
      content,
      alias: type + userId,
    });
    // 用户注册结束自动关注一些标签
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .take(5)
      .orderBy('tag.interest')
      .getMany();

    tags.map(async e => {
      try {
        await this.tagRepository
          .createQueryBuilder()
          .relation(User, 'tags')
          .of(userId)
          .add(e.id);

        const id = e.id;
        await this.tagRepository
          .createQueryBuilder('tag')
          .update(Tag)
          .where('tag.id=:id', { id })
          .set({ interest: () => 'interest + 1' })
          .execute();
      } catch {
        return;
      }
    });
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
      // .leftJoin('user.posts', 'posts')
      // .addSelect(['posts.id'])
      .addOrderBy('avator.id', 'DESC')
      .getOne();

    //粉丝
    const res2 = await this.userRepository.findOne(id, {
      relations: ['follows', 'user', 'user.avator'],
    });

    const res3 = await this.countsAll(id);

    return { ...res1, ...res2, ...res3 };
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

  async findByName(account: string, password?: boolean) {
    const querryBuilder = await this.userRepository.createQueryBuilder('user');
    const querryBuilder1 = await this.userRepository.createQueryBuilder('user');

    querryBuilder
      .where('user.phonenumber = :account', { account })
      .leftJoinAndSelect('user.roles', 'roles');

    querryBuilder1
      .where('user.name = :account', { account })
      .leftJoinAndSelect('user.roles', 'roles');

    if (password) {
      querryBuilder.addSelect('user.password');
      querryBuilder1.addSelect('user.password');
    }
    const entity = await querryBuilder.getOne();
    const entity1 = await querryBuilder1.getOne();

    return entity || entity1;
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

  //用户关注专栏和消除 id是专栏id
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
      return true;
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
      return false;
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
      try {
        await this.userRepository
          .createQueryBuilder('user')
          .relation(User, 'follows')
          .of(userid2)
          .add(userid1);

        await this.userRepository
          .createQueryBuilder()
          .update(User)
          .where('user.id =:userid1', { userid1 })
          .set({ followedBy: () => 'followedBy + 1' })
          .execute();
        return true;
      } catch {
        await this.userRepository
          .createQueryBuilder('user')
          .relation(User, 'follows')
          .of(userid2)
          .remove(userid1);

        await this.userRepository
          .createQueryBuilder()
          .update(User)
          .where('user.id =:userid1', { userid1 })
          .set({ followedBy: () => 'followedBy - 1' })
          .execute();
      }
    } else {
      return;
    }
  }
  // 用户关注问题
  async userFollowQue(userId: number, postId: number) {
    const entity = await this.postRepository.findOne(postId);
    let boolen;
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .relation(User, 'concern')
        .of(userId)
        .add(postId);

      boolen = true;
    } catch {
      await this.userRepository
        .createQueryBuilder('user')
        .relation(User, 'concern')
        .of(userId)
        .remove(postId);
      boolen = false;
    }

    const res = await this.postConcerned(postId);
    entity.concerned = res;
    await this.postRepository.save(entity);
    return boolen;
  }

  // 一个问题被关注的数量 反向查询
  async postConcerned(postId: number) {
    const res = await this.userRepository
      .createQueryBuilder()
      .relation(Post, 'concern')
      .of(postId)
      .loadMany();
    return res.length;
  }

  // 用户所关注的问题
  async userFollwedQue(userId: number) {
    return await this.userRepository
      .createQueryBuilder()
      .relation(User, 'concern')
      .of(userId)
      .loadMany();
  }

  // 用户所关注的专栏
  async userFollowCollect(userId: number) {
    return await this.userRepository
      .createQueryBuilder()
      .relation(User, 'interest')
      .of(userId)
      .loadMany();
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
  async getfollows(id: any) {
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
  async whofollows(id: any) {
    // console.log(id)
    const res = await this.userRepository.findOne(id, {
      relations: ['follows', 'user', 'user.avator'],
    });

    return res;
  }
  async countsAll(userId: number) {
    let data = { liked: 0, post: 0, question: 0, counts: 0, note: 0 };

    const res = await this.postRepository
      .createQueryBuilder('post')
      .where('userId=:userId', { userId })
      .getMany();

    res.map(e => {
      data['liked'] += e['liked'];
      data['counts'] += e['counts'];
      switch (e.type) {
        case 'post':
          data['post'] += 1;
          break;
        case 'question':
          data['question'] += 1;
          break;
        case 'note':
          data['note'] += 1;
          break;
      }
    });

    return data;
  }

  async countSite() {
    let data = {
      post: 0,
      question: 0,
      note: 0,
      collection: 0,
      comment: 0,
      answer: 0,
      tag: 0,
      user: 0,
    };

    const res = await this.postRepository.createQueryBuilder('post').getMany();
    const res1 = await this.collectionRepository.createQueryBuilder().getMany();
    const res2 = await this.CommentRepository.createQueryBuilder().getMany();
    const res3 = await this.tagRepository.createQueryBuilder().getMany();
    const res4 = await this.userRepository.createQueryBuilder().getMany();

    data['collection'] = res1.length;
    data['tag'] = res3.length;
    data['user'] = res4.length;
    res.map(e => {
      switch (e.type) {
        case 'post':
          data['post'] += 1;
          break;
        case 'question':
          data['question'] += 1;
          break;
        case 'note':
          data['note'] += 1;
          break;
      }
    });

    res2.map(e => {
      switch (e.type) {
        case 'comment':
          data['comment'] += 1;
          break;
        case 'answer':
          data['answer'] += 1;
          break;
      }
    });
    return data;
  }

  async getRecomendFollow() {
    const tagLen = await this.tagRepository
      .createQueryBuilder('tag')
      .getCount();

    let skipTag = Math.random() * tagLen;
    if (skipTag < 4) {
    } else {
      skipTag -= 4;
    }

    const userLen = await this.userRepository
      .createQueryBuilder('user')
      .getCount();

    let skipUser = Math.random() * userLen;
    if (skipUser < 2) {
    } else {
      skipUser -= 2;
    }
    const res1 = await this.tagRepository
      .createQueryBuilder('tag')
      .take(4)
      .skip(Math.floor(skipTag))
      .orderBy('tag.interest', 'DESC')
      .getMany();

    const res2 = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.avator', 'avator')
      .addSelect('avator.url')
      .take(2)
      .skip(Math.floor(skipUser))
      .getMany();

    var res3 = [];
    res3.push(res1, res2);
    return res3;
  }
}
