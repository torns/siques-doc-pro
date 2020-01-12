import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Letter {

    @PrimaryGeneratedColumn()
    id: string

    @Column('longtext')
    content: string
}