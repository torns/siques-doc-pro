import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Notification {

    @PrimaryGeneratedColumn()
    id: string

    @CreateDateColumn()
    created: Date

    @Column({ nullable: true })
    title: string

    @Column({ nullable: true })
    body: string

    @Column()
    type: string

    @ManyToOne(type => User)
    receive_uid: User

    @Column('tinyint', { default: 0 })
    is_read: boolean
}