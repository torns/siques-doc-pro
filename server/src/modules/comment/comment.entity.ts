import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

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
  like: number

  //多个评论对应一篇文章
  @ManyToOne(
    type => Post,
    post => post.comments,
    { nullable: false },
  )
  post: Post;

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
