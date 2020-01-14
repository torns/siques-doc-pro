import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { Repository } from 'typeorm';
import { BookmarkDto } from './bookmark.dto';
import { User } from '../user/user.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly BookmarkRepository: Repository<Bookmark>,
  ) {}

  async createBookmark(data: BookmarkDto, user: User) {
    return await this.BookmarkRepository.save({
      ...data,
      users: user,
    });
  }

  async showBookmark(id: number) {
    const res = await this.BookmarkRepository.createQueryBuilder()
      .where('usersId=:id', { id })
      .getMany();
    return res;
  }
}
