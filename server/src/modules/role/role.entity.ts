import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserRole } from 'src/core/enums/user-role.enum';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, unique: true })
  name: UserRole;

  @Column()
  alias: string;

  // 多个角色对应多个用户
  @ManyToMany(
    type => User,
    user => user.roles,
  )
  users: User[];
}
