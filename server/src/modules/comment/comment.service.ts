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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
    const id = user.id;
    return await this.replyRepository.save({
      from_uid: id,
      ...Replydata,
    });
  }

  async showUserAnswer(userId: number) {
    const answer = 'answer';

    const res = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.owner_uid=:userId', { userId })
      .andWhere('comment.type=:answer', { answer })
      .leftJoin('comment.post', 'post')
      .addSelect(['post.id'])
      .getMany();

    // let data = [];

    // res.map(e => {
    //   data.push(e.post);
    // });

    return res;
  }

  async PostCommentLike(id: number, userId: number) {
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .relation(User, 'up')
        .of(userId)
        .add(id);

      await this.userRepository
        .createQueryBuilder('comment')
        .update(Comment)
        .where('comment.id=:id', { id })
        .set({ liked: () => 'liked+1' })
        .execute();
    } catch {
      await this.userRepository
        .createQueryBuilder('user')
        .relation(User, 'up')
        .of(userId)
        .remove(id);

      await this.userRepository
        .createQueryBuilder('comment')
        .update(Comment)
        .where('comment.id=:id', { id })
        .set({ liked: () => 'liked-1' })
        .execute();
    }
  }

  async PostReplyLike(id: number) {
    await this.replyRepository
      .createQueryBuilder()
      .update(Reply)
      .where('reply.id', { id })
      .set({ liked: () => 'liked+1' })
      .execute();
  }

  async update(id: number, data: CommentDto) {
    return await this.commentRepository.update(id, data);
  }

  async updateReply(id: number, data: CommentDto) {
    return await this.replyRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.commentRepository.delete(id);
  }

  async deleteReply(id: number) {
    return await this.replyRepository.delete(id);
  }

  //展示评论以及子评论
  async showPostComments(id: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .orderBy('comment.created', 'DESC')
      .leftJoin('comment.user', 'user')
      .addSelect(['user.name', 'user.id'])
      .leftJoin('user.avator', 'avator')
      .addSelect(['avator.url'])

      .leftJoinAndSelect('comment.reply', 'reply')

      .addOrderBy('reply.created', 'DESC')
      .leftJoin('reply.from_uid', 'from_uid')
      .addSelect(['from_uid.name', 'from_uid.id'])

      .leftJoin('reply.to_uid', 'to_uid')
      .addSelect(['to_uid.name', 'to_uid.id'])
      .leftJoin('comment.post', 'post')

      .where('post.id=:id', { id })

      .getMany();
  }

  //查找子评论
  // async showPostReply() {
  //   const id = 2
  //   return await this.replyRepository
  //     .createQueryBuilder("reply")
  //     .where("reply.parent_id=:id", { id })
  //     .innerJoinAndSelect("reply.parent_id", "parent")
  //     .getMany()

  // }

  async showComment(id: number) {
    return await this.commentRepository.findOne(id);
  }

  async showReply(id: number) {
    return await this.replyRepository.findOne(id);
  }

  async showUserComments(id: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where('user.id=:id', { id })
      .getMany();
  }

  async showHotComments() {
    const type = 'comment';
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')

      .leftJoinAndSelect('user.avator', 'avator')
      // .addSelect(['avator.url'])
      .leftJoinAndSelect('comment.post', 'post')
      .where('comment.type=:type', { type })
      .orderBy('comment.liked', 'DESC')
      .take(6)
      .getMany();
  }
}
