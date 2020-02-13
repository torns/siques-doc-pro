import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserAction } from 'src/core/enums/useraction.enum';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Collection } from '../collection/collection.entity';

@Entity()
export class ActionUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: UserAction })
  type: UserAction;

  @Column({ unique: true, nullable: true })
  alias: string;

  @Column({ nullable: true })
  content: string;

  @ManyToOne(type => User)
  from_uid: User;

  @ManyToOne(type => User, { nullable: true })
  to_uid: User;

  @ManyToOne(type => Post, { nullable: true })
  to_Post: Post;

  @ManyToOne(type => Collection, { nullable: true })
  to_Collection: Collection;

  @CreateDateColumn()
  created: Date;
}
