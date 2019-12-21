import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Entity, createQueryBuilder } from 'typeorm';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    async store(data: UserDto) {
        const { name } = data;
        const user = await this.userRepository.findOne({ name })
        if (user) {
            throw new BadRequestException("用户已存在")
        }
        const res = await this.userRepository.create(data)
        await this.userRepository.save(res);
        return res;
    }

    async show(id: string) {
        const entity = await this.userRepository.findOne(id, {
            relations: ['posts']
        });
        if (!entity) {
            throw new NotFoundException("没找到用户")
        }
        return entity;
    }
    async updataPassword(id: string, data: UpdatePasswordDto) {
        const { password, newpassword } = data
        const entity = await this.userRepository.findOne(id);
        if (!entity) {
            throw new NotFoundException("没找到用户")
        }


        const pass = await entity.comparePassword(password)
        if (!pass) {
            throw new BadRequestException("密码验证失败，请重新输入")
        }

        entity.password = newpassword
        return await this.userRepository.save(entity)

    }

    async findByName(name: string, password?: boolean) {
        const querryBuilder = await this.userRepository
            .createQueryBuilder("user");
        querryBuilder.where("user.name = :name", { name })
            .leftJoinAndSelect("user.roles", "roles")
            ;

        if (password) {
            querryBuilder.addSelect("user.password")
        }
        const entity = querryBuilder.getOne()
        return entity
    }

    async liked(id: number) {
        return this.userRepository
            .findOne(id, { relations: ["voted", "voted.user"] });
    }

    //更新用户 
    async update(id: number, data: UserDto) {
        const { roles } = data;
        const entity = await this.userRepository.findOne(id);
        if (roles) {
            entity.roles = roles;
        }
        return await this.userRepository.save(entity)
    }

    //检查用户是否有资源权限
    async possess(
        id: number,
        resource: string,
        resourceId: number,
    ) {
        const result = await this.userRepository
            .createQueryBuilder("user")
            .where('user.id = :id', { id })
            .leftJoin(`user.${resource}`, resource)
            .andWhere(`${resource}.id=:resourceId`, { resourceId })
            .getCount();

        return result === 1 ? true : false;

    }

}
