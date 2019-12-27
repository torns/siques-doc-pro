import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, AfterLoad } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Avator {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    filename: string

    @Column()
    mimetype: string



    @ManyToOne(type => User, user => user.avator, { nullable: true })
    user: User

    url: string

    @AfterLoad()
    getUrl() {

        const appUrl = process.env.APP_URL;
        this.url = `${appUrl}/static/${this.filename}`
    }
}