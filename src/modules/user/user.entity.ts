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
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Role } from '../role/role.entity';

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

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  z;
  @OneToMany(
    type => Post,
    post => post.user,
  )
  posts: Post[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  // 多个角色对应多个用户
  @ManyToMany(
    type => Role,
    role => role.users,
  )
  @JoinTable()
  roles: Role[];

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
