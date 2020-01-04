import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Reply {


    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    parent_id: string;

    @Column()
    reply_id: string;

    //评论或者回复
    @Column()
    reply_type: string;

    @Column()
    body: string;

    @Column({ default: 0 })
    like: number

    //回复用户的id
    @Column()
    from_uid: string

    //目标用户的id
    @Column()
    to_uid: string

    @CreateDateColumn()
    created: Date;
}
