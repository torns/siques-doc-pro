import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, ManyToOne, ManyToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Reply {


    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => Comment, comment => comment.reply)
    parent_id: string;

    // @Column()
    // reply_id: string;

    // //评论或者回复
    // @Column()
    // reply_type: string;

    @Column()
    body: string;

    @Column({ default: 0 })
    liked: number

    //回复用户的id
    @ManyToOne(type => User)
    from_uid: string

    //目标用户的id
    @ManyToOne(type => User)
    to_uid: string

    @CreateDateColumn()
    created: Date;
}
