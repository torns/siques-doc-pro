import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Taglist } from './taglist.entity';
import { Post } from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Taglist, Post])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
