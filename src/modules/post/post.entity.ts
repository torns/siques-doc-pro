import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Category } from "../category/category.entity";

import { User } from "../user/user.entity";
import { Tag } from "../tag/tag.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // nullable可为空
    @Column("longtext", { nullable: true })
    body: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated:Date;

    @ManyToOne(type=>User,user=>user.posts)
    user:User

    //多个文章对应一个分类
    @ManyToOne(type=>Category,category=>category.posts)
    category:Category
    
    // 多个文章对应一个分类
    @ManyToMany(type=>Tag,tag=>tag.posts)
    @JoinTable()
    tags:Tag[]

}