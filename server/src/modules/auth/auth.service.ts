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
    let { account, password, thirdpart, uid } = data;

    let entity: User;
    if (thirdpart) {
      entity = await this.userRepository.findOne(uid);
      account = entity.name;
    } else {
      entity = await this.userService.findByName(account, true);
      if (!entity) {
        throw new UnauthorizedException('用户不存在');
      }

      if (!(await entity.comparePassword(password))) {
        throw new UnauthorizedException('密码不匹配');
      }
    }

    const { id } = entity;
    const payload = { id, account };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
    };
  }

  async validatePhoneNumber(number: string) {
    const random = String(Math.random()).substring(2, 8);
    const apikey = 'a15d23ef365095cadfe6e4c77aeec912';
    const mobile = number;
    const text = `【我思我趣】您的验证码是${random}。如非本人操作，请忽略本短信`;

    const baseUrl = 'https://sms.yunpian.com/v2/sms/single_send.json';
    const url = encodeURI(
      baseUrl + `?apikey=${apikey}&mobile=${mobile}&text=${text}`,
    );
    await axios
      .post(url)
      .then(res => {
        // token赋值
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
        // throw error;
      });
    return random;
  }

  async fetchUrl() {
    const weibo_app_key = '1817535842';
    const reponse_type = 'code';
    const redirect_uri = process.env.CALL_BACK_URL;
    const baseUrl = 'https://api.weibo.com/oauth2/authorize?';

    const weibo_url =
      baseUrl +
      `client_id=${weibo_app_key}&reponse_type=${reponse_type}&redirect_uri=${redirect_uri}`;
    const github_url =
      'https://github.com/login/oauth/authorize?client_id=8e6a860f7dc156db8516&scope=user:name';

    let url = {
      github_url,
      weibo_url,
    };
    return url;
  }

  async signThirdToken(id: any, thirdpart: any) {
    let url;

    switch (thirdpart) {
      case 'weibo':
        url = `https://api.weibo.com/oauth2/access_token?client_id=1817535842&client_secret=57fed87a682b2078e4143afbbf408aa8&grant_type=authorization_code&redirect_uri=http://127.0.0.1:3000?weibo&code=${id}`;
        break;
      case 'git':
        url = `https://github.com/login/oauth/access_token?client_id=8e6a860f7dc156db8516&client_secret=048f0f331d94d8b9c1ac7a48ebd5c0d22985b486&code=${id}`;
        break;
      default:
        break;
    }

    let user_token: any, uid: any;
    if (thirdpart === 'weibo') {
      await axios
        .post(url)
        .then(res => {
          // token赋值
          console.log(res.data);
          user_token = res.data.access_token;
          // 用户id
          uid = res.data.uid;
        })
        .catch(error => {
          throw error;
        });
    }

    if (thirdpart === 'git') {
      await axios
        .get(url, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then(res => {
          // token赋值
          user_token = res.data.access_token;
        })
        .catch(error => {
          throw error;
        });
    }

    let get_url;
    switch (thirdpart) {
      case 'weibo':
        get_url = `https://api.weibo.com/2/users/show.json?access_token=${user_token}&uid=${uid}`;
        break;
      case 'git':
        get_url = `https://api.github.com/user`;
        break;
      default:
        break;
    }

    // 拼接一个链接用来请求用户信息

    let result;

    if (thirdpart === 'git') {
      await axios
        .get(get_url, {
          headers: {
            Authorization: `token ${user_token}`,
          },
        })
        .then(res => {
          // 这里调用bindUser方法将用户信息存入
          // console.log(res.data);
          result = this.bindUser(res.data);
        })
        .catch(error => {
          throw error;
        });
    }

    if (thirdpart === 'weibo') {
      await axios
        .get(get_url)
        .then(res => {
          // 这里调用bindUser方法将用户信息存入

          result = this.bindUser(res.data);
        })
        .catch(error => {
          throw error;
        });
    }

    return result;
  }

  async bindUser(data: any) {
    // 这里要判断用户是否已经存在了

    let user;
    let registerDto;
    const dto = {
      uid: data.id,
    };
    const uid = data.id;
    try {
      await this.thirdRepository.save(dto);
    } catch {}

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
    }

    // 可以查找到的用户

    if (user) {
      const { id, name } = user;
      const payload = { id, name };

      return {
        ...payload,
        allowThirdpartLogin: true,
      };
    } else {
      // 查不到说明没有绑定
      registerDto = {
        name: data.name,
        uid: data.id,
      };
      return registerDto;
    }
  }

  signToken(data: JwtPayload) {
    return this.jwtService.sign(data);
  }

  async push(data: any) {
    const { link } = data;

    const url =
      'http://data.zz.baidu.com/urls?site=siques.cn&token=RshbyPPuO3v3ojbt';
    const res = await axios.post(url, link, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return res.data;
  }
}
