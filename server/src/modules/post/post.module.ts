import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Tag } from '../tag/tag.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, User]), UserModule, AuthModule],
  controllers: [PostController],
  providers: [PostService],

})
export class PostModule { }
