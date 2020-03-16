import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { NotificationDto } from './noticication.dto';

import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Letter } from './letter.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly NotificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(Letter)
    private readonly LetterRepository: Repository<Letter>,
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  // 规矩储存
  async storeNotification(type: any, data: Partial<NotificationDto>) {
    const { from_uid, content, alias, to_Post, to_uid } = data;
    let to_user;

    try {
      const id = to_Post.id;
      to_user = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .where('post.id=:id', { id })
        .getOne();
    } catch {}

    let entity;
    try {
      entity = await this.NotificationRepository.save({
        content,
        type: type,
        alias: alias,
        from_uid: from_uid,
        to_Post: to_Post,
        to_uid: to_user ? to_user.user.id : to_uid,
      });
    } catch {
      if (
        type[0] !== 'commentpost' &&
        type[0] !== 'createpost' &&
        type[0] !== 'adoptanswer' &&
        type[0] !== 'bookmarkpost' &&
        type[0] !== 'privateletter'
      ) {
        await this.NotificationRepository.createQueryBuilder('notification')
          .delete()
          .where('notification.alias=:alias', { alias })
          .execute();
      }
    }

    return entity;
  }

  // 查询用户所有通知
  async showUserLetter(userId: number) {
    return await this.NotificationRepository.createQueryBuilder('notification')

      .where('notification.to_uid=:userId', { userId })
      .leftJoinAndSelect('notification.from_uid', 'user')
      .leftJoinAndSelect('notification.to_Post', 'post')
      .leftJoinAndSelect('notification.to_uid', 'to_user')
      .leftJoin('to_user.avator', 'avator')
      .addSelect(['avator.url'])
      .orderBy('notification.created', 'DESC')
      .limit(10)
      .getMany();
  }

  // 用户所有通知标记已读
  async markedRead(userId: number) {
    // console.log(userId);
    const entity = await this.NotificationRepository.createQueryBuilder(
      'notification',
    )
      .update(Notification)
      .where('to_uid=:userId', { userId })
      .set({ is_read: () => '1' })

      .execute();
  }
}
