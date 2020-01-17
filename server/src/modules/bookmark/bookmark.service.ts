import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { Repository } from 'typeorm';
import { BookmarkDto } from './bookmark.dto';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly BookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,
  ) {}

  async createBookmark(data: BookmarkDto, user: User) {
    await this.BookmarkRepository.save({
      ...data,
      users: user,
    });
  }

  // 查询用户的收藏夹
  async showUserBookmark(id: number) {
    const res = await this.BookmarkRepository.createQueryBuilder('bookmark')
      .where('usersId=:id', { id })
      .leftJoinAndSelect('bookmark.posts', 'posts')
      .getMany();
    return res;
  }

  //查询单个收藏夹的详细信息
  async showBookmark(id: number) {
    const res = await this.BookmarkRepository.createQueryBuilder('bookmark')
      .where('bookmark.id=:id', { id })
      .leftJoinAndSelect('bookmark.posts', 'posts')
      .leftJoin('posts.user', 'user')
      .addSelect(['user.name', 'user.id'])
      .innerJoinAndSelect('bookmark.users', 'users')
      .getOne();
    return res;
  }

  async deleteBookmark(id: number) {
    const res = await this.BookmarkRepository.delete(id);

    return res;
  }

  async bookmarkPost(query: any) {
    const { postId, bookmarkId } = query;

    const id = bookmarkId.split(',');

    if (id.length > 1) {
      id.map(async el => {
        try {
          await this.BookmarkRepository.createQueryBuilder()
            .relation(Bookmark, 'posts')
            .of(el)
            .add(postId);
          await this.PostRepository.createQueryBuilder()
            .update(Post)
            .where('post.id=:postId', { postId })
            .set({ bookmarked: () => 'bookmarked+1' })
            .execute();
        } catch {
          throw Error;
        }
      });
    } else {
      try {
        await this.BookmarkRepository.createQueryBuilder()
          .relation(Bookmark, 'posts')
          .of(bookmarkId)
          .add(postId);
        await this.PostRepository.createQueryBuilder()
          .update(Post)
          .where('post.id=:postId', { postId })
          .set({ bookmarked: () => 'bookmarked+1' })
          .execute();
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: '该文章已经被收藏',
          },
          403,
        );
      }
    }
  }

  async deletebookmarkPost(bookmarkId: number, postId: number) {
    await this.BookmarkRepository.createQueryBuilder()
      .relation(Bookmark, 'posts')
      .of(bookmarkId)
      .remove(postId);

    await this.PostRepository.createQueryBuilder()
      .update(Post)
      .where('post.id=:id', { postId })
      .set({ bookmarked: () => 'bookmarked-1' })
      .execute();
  }
}
