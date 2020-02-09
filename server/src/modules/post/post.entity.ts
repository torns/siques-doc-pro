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

  @UpdateDateColumn()
  updated: Date;

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

  // 多个文章对应一个用户
  @ManyToOne(
    type => User,
    user => user.posts,
  )
  user: User;

  //多个文章对应一个分类
  @ManyToOne(
    type => Category,
    category => category.posts,
  )
  category: Category;

  // 多个文章对应一个标签
  @ManyToMany(
    type => Tag,
    tag => tag.posts,
  )
  @JoinTable()
  tags: Tag[];

  @ManyToMany(
    type => User,
    user => user.likes,
  )
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

  @ManyToOne(
    type => Collection,
    collection => collection.posts,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  collection: Collection;
}
