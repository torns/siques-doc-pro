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

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => Letter)
  body: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: 'private' })
  type: string;

  @ManyToOne(type => User)
  receive_uid: User;

  @ManyToOne(type => User)
  send_uid: User;

  @Column('tinyint', { default: 0 })
  is_read: boolean;
}
