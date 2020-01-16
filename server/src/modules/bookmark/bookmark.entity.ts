import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 32 })
  title: string;

  @Column({ nullable: true, length: 256 })
  description: string;

  //多个收藏夹属于一个用户
  @ManyToOne(type => User)
  users: User;

  @ManyToMany(type => Post)
  @JoinTable()
  posts: Post;
}
