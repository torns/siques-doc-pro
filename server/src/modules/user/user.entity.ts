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
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Role } from '../role/role.entity';
import { Collection } from '../collection/collection.entity';
import { Avator } from '../avator/avator.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  name: string;

  //密码去除，除非指定
  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ select: false, unique: true })
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
  @OneToMany(type => Collection, collection => collection.user)
  collections: Collection[];


  // 多个角色对应多个用户
  @ManyToMany(
    type => Role,
    role => role.users,
  )
  @JoinTable()
  roles: Role[];


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




  //多个角色
  @ManyToMany(type => Post,
    post => post.user)
  @JoinTable()
  likes: Post[];

  @ManyToOne(type => Avator, avator => avator.user)
  avator: Avator[]

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
