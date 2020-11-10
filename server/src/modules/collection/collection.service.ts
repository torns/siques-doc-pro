import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CollectionDto } from './collection.dto';
import { UploadFileDto } from '../file/file.dto';
import Client from '../../core/oos/ali';
import dayjs from 'dayjs';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly CollectionRepository: Repository<Collection>,
  ) {}

  async store(user: User, data: CollectionDto) {
    return await this.CollectionRepository.save({
      user,
      ...data,
    });
  }
  async showCollection(id: number, type: any) {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .where('userId=:id', { id })
      .andWhere('collection.type=:type', { type })
      .getMany();
  }

  // 推荐集合
  async getRecommend() {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .limit(4)
      .orderBy('collection.interest', 'DESC')
      .getMany();
  }

  // 推荐笔记本
  async getNote(type: any, limit: any) {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .limit(limit)
      .orderBy('collection.interest', 'DESC')
      .where('collection.type=:type', { type })
      .getMany();
  }

  async getUserCollection(id: number, type: any) {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .where('collection.userId=:id', { id })
      .andWhere('collection.type=:type', { type })
      .leftJoinAndSelect('collection.posts', 'posts')
      .getMany();
  }

  async getCollection(id: number) {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .where('collection.id=:id', { id })
      .leftJoinAndSelect('collection.posts', 'posts')
      .orderBy('posts.created', 'DESC')
      .where('posts.isPublished=1')
      .leftJoin('collection.user', 'user')
      .addSelect(['user.introduction', 'user.name', 'user.id'])
      .leftJoinAndSelect('user.avator', 'avator')
      .getOne();
  }

  async changeCollection(id: number, data: CollectionDto) {
    return await this.CollectionRepository.update(id, data);
  }

  async getPostCollection(id: number) {
    return await this.CollectionRepository.findOne(id);
  }

  async removeCollection(id: number) {
    return await this.CollectionRepository.delete(id);
  }

  async uploadCover(data: UploadFileDto, id: number) {
    //上传头像 头像还需要裁剪

    const now = new Date();
    const date = dayjs(now).format('YYYY-MM-DD/');
    const ss = dayjs(now).format('ss');

    const res: any = await Client.put(
      'collection/cover/' + id + '/' + date + ss + data.originalname,
      data.buffer,
    );

    const url = res.url + '?x-oss-process=style/' + 'collection-cover-picture';

    await this.CollectionRepository.createQueryBuilder('collection')
      .update(Collection)
      .where('id =:id', { id })
      .update({
        cover: url,
      })
      .execute();

    return res;
  }
}
