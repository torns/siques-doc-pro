import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Tag } from '../tag/tag.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Post,Tag])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
