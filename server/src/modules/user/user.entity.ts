import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  RelationId,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Role } from '../role/role.entity';
import { Collection } from '../collection/collection.entity';
import { Avator } from '../avator/avator.entity';
import { Bookmark } from '../bookmark/bookmark.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, nullable: false })
  name: string;

  //密码去除，除非指定
  @Column({ select: false, nullable: false })
  @Exclude()
  password: string;

  @Column({ select: false, unique: true, nullable: false })
  @Exclude()
  phonenumber: string;

  @Column({ nullable: true })
  introduction: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  school: string;

  @Column({ nullable: true })
  organization: string;

  @Column({ nullable: true })
  website: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('tinyint', { default: 0 })
  editor: boolean;

  // 一个用户拥有多篇文章
  @OneToMany(
    type => Post,
    post => post.user,
  )
  posts: Post[];

  // 一个用户拥有多条评论
  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  // 一个用户拥有多个集合
  @OneToMany(
    type => Collection,
    collection => collection.user,
  )
  collections: Collection[];

  //多个标签对应一个用户

  //一个用户擅长多个技能
  @ManyToMany(
    type => Tag,
    tag => tag.user,
  )
  @JoinTable()
  skill: Tag[];

  // 用户关注专栏
  @ManyToMany(type => Collection)
  @JoinTable()
  interest: Collection[];

  // 多个角色对应多个用户
  @ManyToMany(
    type => Role,
    role => role.users,
  )
  @JoinTable()
  roles: Role[];

  @ManyToMany(
    type => Tag,
    tag => tag.user,
  )
  @JoinTable()
  tags: Tag;

  //一个用户关注另一个用户
  @ManyToMany(
    type => User,
    follows => follows.user,
  )
  @JoinTable()
  follows: User[];

  @ManyToMany(
    type => User,
    user => user.follows,
  )
  user: User[];

  //一个用户关注多个收藏夹
  @ManyToMany(type => Bookmark)
  @JoinTable()
  bookmarks: Bookmark[];

  // 一个用户关注问题
  @ManyToMany(
    type => Post,
    post => post.concern,
  )
  @JoinTable()
  concern: Post[];

  //多个角色
  @ManyToMany(
    type => Post,
    post => post.user,
  )
  @JoinTable()
  likes: Post[];

  @OneToMany(
    type => Avator,
    avator => avator.user,
    { cascade: true },
  )
  avator: Avator[];

  @BeforeInsert()
  // 更新之前先比对
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string) {
    return await bcrypt.compareSync(password, this.password);
  }
}
