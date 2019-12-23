import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  alias: string;

  @OneToMany(
    type => Post,
    post => post.tags,
  )
  posts: Post[];
}
