import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import * as bcrypt from "bcryptjs"
import {Exclude} from "class-transformer"

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