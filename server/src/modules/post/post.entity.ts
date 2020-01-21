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
  BeforeUpdate,
  Generated,
  AfterLoad,
  BeforeInsert,
} from 'typeorm';
import { Category } from '../category/category.entity';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { Collection } from '../collection/collection.entity';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { Exclude } from 'class-transformer';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
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

  @Column({ default: 0 })
  liked: number;

  @Column({ default: 0 })
  bookmarked: number;

  @Column({ default: 0 })
  counts: number;

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
  )
  comments: Comment[];

  @ManyToOne(
    type => Collection,
    collection => collection.posts,
    {
      onDelete: 'CASCADE',
    },
  )
  collection: Collection;

  @AfterLoad()
  async insertAlias() {
    // this.alias = await this.body.substring(0, 100)
  }
}
