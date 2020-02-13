import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionUser } from './action.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Notification } from '../notification/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActionUser, Post, Notification]),
    AuthModule,
  ],
  controllers: [ActionController],
  exports: [ActionService],
  providers: [ActionService],
})
export class ActionModule {}
