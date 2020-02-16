import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CollectionDto } from './collection.dto';

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
  async showCollection(id: number) {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .where('userId=:id', { id })
      .getMany();
  }

  async getUserCollection(id: number) {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .where('collection.userId=:id', { id })
      .leftJoinAndSelect('collection.posts', 'posts')
      .getMany();
  }

  async getCollection(id: number) {
    return await this.CollectionRepository.createQueryBuilder('collection')
      .where('collection.id=:id', { id })
      .leftJoinAndSelect('collection.posts', 'posts')
      .orderBy('posts.created', 'DESC')
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
}
