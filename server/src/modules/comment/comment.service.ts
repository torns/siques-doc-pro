import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../user/user.entity';
import { CommentDto } from './comment.dto';
import { ReplyDto } from './reply.dto';
import { Reply } from './Reply.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) { }

  // 评论
  async storePostComment(id: number, user: User, data: CommentDto) {
    return await this.commentRepository.save({
      user,
      ...data,
      post: { id },
    });
  }

  //回复同时还要创建内容
  // async storePostReply(id: number, user: User, data: CommentDto, parentId) {

  //   //先保存这段评论
  //   const entity = await this.commentRepository.save({
  //     user,
  //     ...data,
  //     post: { id },
  //   });

  //   return await this.commentRepository.createQueryBuilder()
  //     .createQueryBuilder()
  //     .relation(Comment, 'parent')
  //     .of(parentId)
  //     .add(entity);

  // }

  async storePostReply(Replydata: ReplyDto, user: User) {

    const id = user.id
    return await this.replyRepository.save({
      from_uid: id,
      ...Replydata
    })

  }




  async update(id: number, data: CommentDto) {
    return await this.commentRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.commentRepository.delete(id);
  }

  async showPostComments(id: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoin('comment.post', 'post')
      .where('post.id=:id', { id })
      .getMany();
  }

  async showUserComments(id: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where('user.id=:id', { id })
      .getMany();
  }
}
