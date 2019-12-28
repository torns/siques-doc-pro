import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Entity, createQueryBuilder } from 'typeorm';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async liked(id: number) {
    return this.userRepository.findOne(id, {
      relations: ['voted', 'voted.user'],
    });
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
}
