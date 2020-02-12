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
  ) {}

  // 查询用户评论通知
  async commentMessage(id: number) {
    const comment = await this.CommentRepository.createQueryBuilder('comment')
      .where('comment.owner_uid=:id', { id })
      .leftJoin('comment.user', 'user')
      .addSelect(['user.id', 'user.name'])
      .leftJoin('comment.post', 'post')
      .addSelect(['post.id', 'post.title', 'post.type'])
      .getMany();

    const follow = await this.UserRepository.findOne(id, {
      relations: ['user'],
    });
    return { comment, follow };
  }

  // 私信存储
  async storeLetter(user: User, id: number, data: Partial<NotificationDto>) {
    const { content } = data;

    // const enetity = await this.LetterRepository.save({
    //   content: body,
    // });

    const to_user = await this.UserRepository.findOne(id);
    console.log(data);
    await this.NotificationRepository.save({
      content,
      send_uid: user,
      receive_uid: to_user,
    });
  }
  // 查询用户私信
  async showUserLetter(userId: number) {
    return await this.NotificationRepository.createQueryBuilder('notification')

      .where('notification.receive_uid=:userId', { userId })
      .leftJoinAndSelect('notification.send_uid', 'user')
      .getMany();
  }
}
