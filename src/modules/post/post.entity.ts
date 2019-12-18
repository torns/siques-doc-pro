import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    // nullable可为空
    @Column("longtext",{nullable:true})
    body:string;

    @CreateDateColumn()
    created:Date;

    @UpdateDateColumn()
    updated:Date;
}