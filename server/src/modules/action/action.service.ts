import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActionUser } from './action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDto } from './action.dto';
import { UserAction } from 'src/core/enums/useraction.enum';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Notification } from '../notification/notification.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionUser)
    private readonly actionRepository: Repository<ActionUser>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async storeAction(type: any, data: Partial<ActionDto>) {
    const { from_uid, alias, content, to_Collection, to_Post, to_uid } = data;
    let entity;
    try {
      entity = await this.actionRepository.save({
        content,
        type: type,
        alias: alias,
        from_uid: from_uid,
        to_Collection: to_Collection,
        to_Post: to_Post,
        to_uid: to_uid,
      });
    } catch {
      if (
        type[0] !== 'commentpost' &&
        type[0] !== 'createpost' &&
        type[0] !== 'adoptanswer' &&
        type[0] !== 'bookmarkpost'
      ) {
        await this.actionRepository
          .createQueryBuilder('action_user')
          .delete()
          .where('action_user.alias=:alias', { alias })
          .execute();
      }
    }

    return entity;

    console.log(type, from_uid, to_Collection, to_Post, to_uid);
  }

  async fetchUserAction(userid: number) {
    return await this.actionRepository
      .createQueryBuilder('action')
      .where('action.from_uid=:userid', { userid })
      .leftJoin('action.from_uid', 'user')
      .addSelect(['user.name', 'user.id'])
      .leftJoinAndSelect('action.to_Post', 'post')
      .addSelect(['post.cover'])
      .leftJoinAndSelect('action.to_uid', 'touser')
      .leftJoin('touser.avator', 'avator')
      .addSelect(['avator.url'])
      .orderBy('action.created', 'DESC')
      .limit(15)
      .getMany();
  }
}
