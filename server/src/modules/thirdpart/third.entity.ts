import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class ThirdPart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  uid: string;

  @ManyToMany(
    type => User,
    user => user.thirdpart,
  )
  user: User;
}
