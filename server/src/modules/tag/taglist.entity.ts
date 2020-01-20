import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Taglist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    type => Tag,
    tag => tag.taglist,
  )
  tags: Tag[];
}
