import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Posttype } from 'src/core/enums/posttype.enum';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: 0 })
  interest: Number;

  @Column({ default: 0 })
  amount: Number;

  @Column({ type: 'enum', enum: Posttype })
  type: Posttype;

  @Column({ nullable: true })
  cover: string;

  //多个集合对应一个用户
  @ManyToOne(
    type => User,
    user => user.collections,
  )
  user: User;

  //一个集合对应多篇文章
  @OneToMany(
    type => Post,
    post => post.collection,
    {
      cascade: true,
    },
  )
  posts: Post[];
}
