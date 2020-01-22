import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Taglist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  alias: string;

  @OneToMany(
    type => Tag,
    tag => tag.taglist,
  )
  tags: Tag[];
}
