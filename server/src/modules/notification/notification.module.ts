import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { User } from '../user/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Comment } from '../comment/comment.entity';
import { Letter } from './letter.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Notification, User, Comment, Letter]), AuthModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule { }
