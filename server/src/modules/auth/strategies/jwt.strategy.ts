import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      secretOrKey: 'sadjyunbng-0=hrnasdasdlghzxhc',
      UnauthorizedException: '过期',
    });
  }

  async validate(payload: JwtPayload) {
    // console.log(payload)
    const { account } = payload;
    const entity = await this.userService.findByAccount(account, false);

    // 如果token有效，但是未找到用户
    if (!entity) {
      throw new UnauthorizedException('未找到用户');
    }
    //装饰器返回的是这个吗？
    return entity;
  }
}
