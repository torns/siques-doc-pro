import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import e, { urlencoded } from 'express';
import axios from 'axios';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../user/user.dto';
import { ThirdPart } from '../thirdpart/third.entity';

import { PushService } from '../push/push.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ThirdPart)
    private readonly thirdRepository: Repository<ThirdPart>,

    private readonly pushService: PushService,
  ) {}

  private apikey = 'a15d23ef365095cadfe6e4c77aeec912';

  // 储存账号与code
  private map = new Map();

  async login(data: LoginDto) {
    let { account, thirdpart, password, name, uid, verification } = data;

    let entity: User;

    // 账号密码登录
    if (password) {
      entity = await this.userService.findByAccount(account, true);

      if (!(await entity.comparePassword(password))) {
        throw new UnauthorizedException('密码不匹配');
      }
    }

    // console.log(data);
    // 手机登录
    if (account && verification && !thirdpart) {
      if (this.loginByPhone(account, verification)) {
        entity = await this.userService.findByAccount(account, false);

        if (!entity) {
          entity = await this.registerNewUser(account);
        }
      } else {
        throw new UnauthorizedException('验证码不正确');
      }

      // 老用户，直接登录
    }
    // 第三方登录
    if (thirdpart && uid) {
      // 确认是否已绑定, 如果没有用户与此uid绑定，则继续
      entity = await this.getBindedUser(uid);

      // console.log(entity);
      // 未绑定用户，则判断传进来的号码是否已注册否则新增，只有再绑定时才会有手机号
      // 已注册则与该uid绑定，没有则创建新用户
      if (entity === undefined) {
        entity = await this.findOrStoreNewUser(account, name, uid);
      }

      account = entity.name;
    }

    const { id } = entity;
    const payload = { id, account };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
    };
  }

  // 绑定用户与uid
  async bind(account: string, uid: string, u: User) {
    const entity = await this.thirdRepository
      .createQueryBuilder('third')
      .where('third.uid=:uid', { uid })
      .getOne();
    if (entity) {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'thirdpart')
        .of(u)
        .add(entity);
    }
  }

  // 找到或者创建新用户
  async findOrStoreNewUser(account: string, name?: string, uid?: string) {
    let entity;
    // 已经注册过

    entity = await this.userService.findByAccount(account, false);

    if (!entity) {
      entity = await this.registerNewUser(account, name);
    }

    // 不管注册没有注册都没绑定成功
    // 此时绑定用户与第三方
    this.bind(account, uid, entity);

    return entity;
  }

  async getBindedUser(uid: string) {
    // 查询该 uid 对应的记录
    const res = await this.thirdRepository
      .createQueryBuilder('third')
      .where('third.uid=:uid', { uid })
      .getOne();

    if (res) {
      return await this.userRepository
        .createQueryBuilder()
        .relation(ThirdPart, 'user')
        .of(res)
        .loadOne();
    }
  }

  loginByPhone(mobile: string, verification: number) {
    return this.validateCode(mobile, verification);
  }

  registerNewUser(account: string, name?: string) {
    if (name && this.userService.findByAccount(name) !== null) {
      name = name + this.hashCode(account);
    }
    let user = new UserDto();
    user.phonenumber = account;
    const hash = this.hashCode(account);
    user.name = name ? name : '趣友' + hash;
    // 懂得
    user.password = this.hashCode(user.name + 'hjslx').toString();
    return this.userService.store(user);
  }

  async sendVerificationCode(mobile: string) {
    const random = String(Math.random()).substring(2, 8);

    const text = `【我思我趣】您的验证码是${random}。如非本人操作，请忽略本短信`;

    const baseUrl = 'https://sms.yunpian.com/v2/sms/single_send.json';
    const url = encodeURI(
      baseUrl +
        `?apikey=${this.apikey}&mobile=${mobile}&text=${text}&register=true`,
    );
    let data;

    await axios
      .post(url)
      .then(res => {
        // token赋值
        data = res.data;
        // 设置到键值对中

        var now = new Date();

        this.map.set(mobile, { random, now });
      })
      .catch(error => {
        data = error;
        // throw error;
      });
    return data;
  }

  validateCode(mobile: string, verification: number) {
    try {
      let { random, now }: any = this.map.get(mobile);
      console.log(this.map.get(mobile));
      // 15分钟内有效
      if (Date.now() > now + 15 * 60 * 1000) {
        return false;
      }

      if (random === verification) this.map.delete(mobile);

      return random === verification;
    } catch (error) {
      return false;
    }
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
          // 这里调用bindUser方法判断是否需要后序绑定
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

    const dto = {
      uid: data.id,
    };
    const uid = data.id;
    try {
      await this.thirdRepository.save(dto);
    } catch {}

    // 获取绑定用户
    let user = await this.getBindedUser(uid);

    // 可以查找到的用户

    if (user) {
      const { name } = user;
      const payload = { uid, name };

      return {
        ...payload,
        // 直接登录标识
        allowThirdpartLogin: true,
      };
    } else {
      // 查不到说明没有绑定
      // 返回用户名与uid,接下来用户用手机号绑定该uid
      return {
        name: data.name,
        uid: data.id,
      };
    }
  }

  signToken(data: JwtPayload) {
    return this.jwtService.sign(data);
  }

  async push(data: any) {
    const { link } = data;
    let res = null;
    const canPush = await this.pushService.push(link);
    if (canPush) {
      const url =
        'http://data.zz.baidu.com/urls?site=https://www.siques.cn&token=RshbyPPuO3v3ojbt';
      await axios
        .post(url, link, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then(re => {
          res = re.data;
        })
        .catch(error => {
          return error;
        });
    }

    return res;
  }

  hashCode(s: string) {
    if (Array.prototype.reduce) {
      return s.split('').reduce(function(a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
    }
    var hash = 0;
    if (s.length === 0) return hash;
    for (var i = 0; i < s.length; i++) {
      var character = s.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}
