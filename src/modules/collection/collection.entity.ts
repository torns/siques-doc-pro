import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Collection {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;


    //多个集合对应一个用户
    @ManyToOne(type => User, user => user.collections)
    user: User

}