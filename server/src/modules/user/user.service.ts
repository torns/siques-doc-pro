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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

  ) { }
  async store(data: UserDto) {
    const { phonenumber } = data;
    const user = await this.userRepository.findOne({ phonenumber });
    if (user) {
      throw new BadRequestException('用户已存在');
    }
    const res = await this.userRepository.create(data);
    await this.userRepository.save(res);
    return res;
  }

  async show(id: number) {

    const entity = await this.userRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('未找到用户');
    }
    const querryBuilder = this.userRepository.createQueryBuilder("user")
    const result = await querryBuilder.where("user.id =:id", { id })
      .leftJoinAndSelect("user.avator", "avator")
      .select(["user.id", 'avator.id'])
      .orderBy("avator.id", "DESC")
      .limit(1)
      .getOne();
    console.log(result.avator)
    const user = {
      ...entity,
      avator: result.avator ? result.avator : null
    }


    return user;
  }

  //传入的用户id
  async userliked(id: number) {
    console.log(id)
    const res = await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'user')
      .of(id)
      .loadMany()
    return res

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
    const { roles } = data;
    const entity = await this.userRepository.findOne(id);
    if (roles) {
      entity.roles = roles;
    }
    return await this.userRepository.save(entity);
  }

  //检查用户是否有资源权限
  async possess(id: number, resource: string, resourceId: number) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoin(`user.${resource}`, resource)
      .andWhere(`${resource}.id=:resourceId`, { resourceId })
      .getCount();

    return result === 1 ? true : false;
  }

  //改变编辑器
  async changeEditor(id: number, body) {
    const { editor } = body

    const entity = await this.userRepository.findOne(id)

    entity.editor = editor
    // 这里用更新才行？
    return await this.userRepository.update(id, entity);
  }

  async showMessage(id: number) {
    return await this.userRepository.findOne(id, {
      relations: ["avator"]
    });
  }


  //点赞和消除
  async like(id: number, user: User) {
    console.log(user.id, id)
    try {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'likes')
        .of(user)
        .add(id);
    } catch{
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'likes')
        .of(user)
        .remove(id);
    }

  }
  // 被谁点过数量 给的是postid
  // leftjoin就是把符合的数据返回
  //leftJoinandselect就是会把符合的数据以及子表的数据带出来
  async countliked(id: number) {
    // 这里要给postid
    console.log(id)
    const res = await this.userRepository
      .createQueryBuilder("user")
      .leftJoin("user.likes", "likes")
      .where("postId=:id", { id })
      .getMany()
    return res.length
  }



  // 给哪些文章点过赞 用户id
  async liked(id: number) {

    const res = await this.postRepository
      .createQueryBuilder("post")

      .relation(User, 'likes')

      .of(id)



      .loadMany()

    return res
  }



}
