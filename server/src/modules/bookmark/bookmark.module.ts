import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Post]), AuthModule],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
