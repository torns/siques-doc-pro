import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { Reply } from './Reply.entity';
import { Commentype } from 'src/core/enums/commentype.enum';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  body: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: 0 })
  liked: number;

  @Column('tinyint', { default: 0 })
  is_read: boolean;

  @Column('tinyint', { default: 0, nullable: true })
  is_adopt: boolean;

  @Column({ type: 'enum', enum: Commentype, default: 'comment' })
  type: Commentype;

  //多个评论对应一篇文章
  @ManyToOne(
    type => Post,
    post => post.comments,
    { nullable: false, onDelete: 'CASCADE' },
  )
  post: Post;

  @ManyToOne(type => User)
  owner_uid: string;

  //一个评论对应多个回复
  @OneToMany(
    type => Reply,
    reply => reply.parent_id,
    { cascade: true },
  )
  reply: Reply[];

  // 多个评论对应多个评论
  // @ManyToMany(
  //   type => Comment,
  //   parents => parents.children,
  // )
  // @JoinTable()
  // parent: Comment;

  // @ManyToMany(
  //   type => Comment,
  //   children => children.parent,
  // )
  // children: Comment[];

  @ManyToOne(
    type => User,
    user => user.comments,
    { nullable: false },
  )
  user: User;
}
