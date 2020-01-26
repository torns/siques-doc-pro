import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  AfterLoad,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Avator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  url: string;

  @ManyToOne(
    type => User,
    user => user.avator,
    { nullable: false },
  )
  user: User;

  @CreateDateColumn()
  created: Date;

  // @AfterLoad()
  // getUrl() {

  //     const appUrl = process.env.APP_URL;
  //     this.url = `${appUrl}/static/${this.filename}`
  // }
}
