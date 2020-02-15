import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Letter } from './letter.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => Letter)
  body: string;

  @Column({ unique: true })
  alias: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: 'private' })
  type: string;

  // 通知发给谁（谁拥有这条通知）
  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  to_uid: User;

  // 谁触发的这条通知
  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  from_uid: User;

  // from_uid评论to_Post
  @ManyToOne(type => Post, { nullable: true })
  to_Post: Post;

  @Column('tinyint', { default: 0 })
  is_read: boolean;
}
