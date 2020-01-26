import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  // nullable可为空
  @Column('longtext', { nullable: true, select: false })
  body: string;
}
