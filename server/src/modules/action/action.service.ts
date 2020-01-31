import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActionUser } from './action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDto } from './action.dto';
import { UserAction } from 'src/core/enums/useraction.enum';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionUser)
    private readonly actionRepository: Repository<ActionUser>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async storeAction(type: any, data: Partial<ActionDto>) {
    const { from_uid, to_Collection, to_Post, to_uid } = data;
    const entity = await this.actionRepository.save({
      type: type,
      from_uid: from_uid,
    });

    const Post = await this.postRepository.findOne(to_Post);

    entity.to_Post = Post;
    const res = await this.actionRepository.save(entity);
    return res;

    console.log(type, from_uid, to_Collection, to_Post, to_uid);
  }

  async fetchUserAction(userid: number) {
    return await this.actionRepository
      .createQueryBuilder('action')
      .where('action.from_uid=:userid', { userid })
      .leftJoinAndSelect('action.from_uid', 'user')
      .leftJoinAndSelect('action.to_Post', 'post')
      .getMany();
  }
}
