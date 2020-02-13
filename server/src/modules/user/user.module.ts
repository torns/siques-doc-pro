import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { PostService } from '../post/post.service';
import { PostModule } from '../post/post.module';
import { Post } from '../post/post.entity';
import { Avator } from '../avator/avator.entity';
import { Collection } from '../collection/collection.entity';
import { ActionModule } from '../action/action.module';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { NotificationModule } from '../notification/notification.module';
import { Notification } from '../notification/notification.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),

    TypeOrmModule.forFeature([
      User,
      Post,
      Avator,
      Collection,
      Tag,
      Comment,
      Notification,
    ]),
    ActionModule,
    NotificationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
