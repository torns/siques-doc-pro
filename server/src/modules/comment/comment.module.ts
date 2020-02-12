import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { AuthModule } from '../auth/auth.module';
import { Reply } from './Reply.entity';
import { User } from '../user/user.entity';
import { ActionModule } from '../action/action.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Reply, User]),
    AuthModule,
    ActionModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
