import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { AuthModule } from '../auth/auth.module';
import { Reply } from './Reply.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Reply, User]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
