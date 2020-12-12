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
  AfterLoad,
  OneToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { Collection } from '../collection/collection.entity';

import { Exclude } from 'class-transformer';
import { Posttype } from 'src/core/enums/posttype.enum';
import { Category } from '../category/category.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 0 })
  editor: boolean;

  // nullable可为空
  @Column('longtext', { nullable: true, select: false })
  @Exclude()
  body: string;

  @Column({ default: '' })
  alias: string;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

  @Column({ default: 0 })
  parentId: number;

  @Column({ default: 0 })
  parentIds: number;

  @Column({ default: 0 })
  views: number;

  @Column('longtext', { nullable: true, select: false })
  cover: string;

  @Column({ default: 0 })
  liked: number;

  @Column({ default: 0 })
  bookmarked: number;

  @Column({ default: 0 })
  counts: number;

  @Column({ default: 0 })
  concerned: number;

  @Column({ type: 'enum', enum: Posttype })
  type: Posttype;

  @Column({ default: 0 })
  isPublished: number;

  @Column({ default: true })
  status: Boolean;

  // 一个问题对应一个回答

  adoptAnswer: Comment;

  // 多个文章对应一个用户

  user: User;

  // 多个文章对应一个标签

  tags: Tag[];

  users: User[];

  @OneToMany(
    type => Comment,
    comment => comment.post,
    {
      cascade: true,
    },
  )
  comments: Comment[];

  // 一个用户关注问题
  @ManyToMany(
    type => User,
    user => user.concern,
  )
  concern: User[];

  collection: Collection;
}
