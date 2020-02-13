import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { User } from '../user/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Comment } from '../comment/comment.entity';
import { Letter } from './letter.entity';
import { Post } from '../post/post.entity';
import { ActionModule } from '../action/action.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User, Comment, Letter, Post]),
    AuthModule,
    ActionModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
