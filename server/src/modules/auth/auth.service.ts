import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { urlencoded } from 'express';
import axios from 'axios';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../user/user.dto';
import { ThirdPart } from '../thirdpart/third.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ThirdPart)
    private readonly thirdRepository: Repository<ThirdPart>,
  ) {}

  async login(data: LoginDto) {
    const { phonenumber, password, name } = data;
    const entity = await this.userService.findByName(phonenumber, true, name);

    if (!entity) {
      throw new UnauthorizedException('用户不存在');
    }

    if (!(await entity.comparePassword(password))) {
      throw new UnauthorizedException('密码不匹配');
    }
    const { id } = entity;
    const payload = { id, phonenumber, name };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
    };
  }

  async fetchUrl() {
    const weibo_app_key = '1817535842';
    const reponse_type = 'code';
    const redirect_uri = 'http://127.0.0.1:3000';
    const baseUrl = 'https://api.weibo.com/oauth2/authorize?';

    const url =
      baseUrl +
      `client_id=${weibo_app_key}&reponse_type=${reponse_type}&redirect_uri=${redirect_uri}`;
    console.log(url);
    return url;
  }

  async signWeiboToken(id: any) {
    const url = `https://api.weibo.com/oauth2/access_token?client_id=1817535842&client_secret=57fed87a682b2078e4143afbbf408aa8&grant_type=authorization_code&redirect_uri=http://127.0.0.1:3000&code=${id}`;

    let user_token: any, uid: any;
    await axios
      .post(url)
      .then(res => {
        // token赋值
        user_token = res.data.access_token;
        // 用户id
        uid = res.data.uid;
      })
      .catch(error => {
        console.log(error);
      });

    // 拼接一个链接用来请求用户信息
    const get_url = `https://api.weibo.com/2/users/show.json?access_token=${user_token}&uid=${uid}`;
    let result;
    await axios
      .get(get_url)
      .then(res => {
        // 这里调用bindUser方法将用户信息存入
        result = this.bindUser(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    return result;
  }

  async bindUser(data: any) {
    // 这里要判断用户是否已经存在了

    let user;
    if (data) {
      const uid = data.id;
      const entity = await this.thirdRepository
        .createQueryBuilder('third')
        .where('third.uid=:uid', { uid })
        .getOne();
      if (entity) {
        user = await this.userRepository
          .createQueryBuilder()
          .relation(ThirdPart, 'user')
          .of(entity)
          .loadOne();
      } else {
        const name = data.name;
        const entity = await this.userRepository
          .createQueryBuilder('user')
          .where('user.name=:name', { name })
          .getOne();
        if (entity) {
          data.name = data.name + `(${data.location})`;
        } else {
          data.password = '123';
          await this.userService.store(data);
        }
      }
    }

    if (user) {
      const { id, name } = user;
      const payload = { id, name };
      const token = this.signToken(payload);
      return {
        ...payload,
        token,
      };
    }
  }

  signToken(data: JwtPayload) {
    return this.jwtService.sign(data);
  }
}
