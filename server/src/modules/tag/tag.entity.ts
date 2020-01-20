import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { Taglist } from './taglist.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  alias: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created: Date;

  @OneToMany(
    type => Post,
    post => post.tags,
  )
  posts: Post[];

  @ManyToOne(
    type => Taglist,
    taglist => taglist.tags,
  )
  taglist: Taglist;

  @ManyToMany(
    type => User,
    user => user.tags,
  )
  user: User;
}
