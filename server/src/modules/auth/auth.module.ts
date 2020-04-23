import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ThirdPart } from '../thirdpart/third.entity';
import { Push } from '../push/push.entity';
import { PushService } from '../push/push.service';
import { PushModule } from '../push/push.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([User, ThirdPart]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    PushModule,
    JwtModule.register({
      secret: 'sadjyunbng-0=hrnasdasdlghzxhc',
      signOptions: {
        expiresIn: '14d', //12h 7d
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
