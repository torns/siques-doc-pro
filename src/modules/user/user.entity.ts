import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, JoinTable } from "typeorm"
import * as bcrypt from "bcryptjs"
import {Exclude} from "class-transformer"
import { Post } from "../post/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{unique:true})
    name:string;

    @Column()
    @Exclude()
    password:string;

    @CreateDateColumn()
    created:Date;

    @UpdateDateColumn()
    updated:Date;


    @OneToMany(type => Post,post =>post.user)
    posts:Post[]

    @ManyToMany(type=>Post,post=>post.liked)
    @JoinTable()
    voted:Post[]


    @BeforeInsert()
    // 更新之前先比对
    @BeforeUpdate()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10)
    }

    async comparePassword(password:string){
        return await bcrypt.compareSync(password,this.password)
    }

}