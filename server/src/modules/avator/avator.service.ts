import { Injectable } from '@nestjs/common';
import { UploadFileDto } from '../file/file.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Avator } from './avator.entity';
import { Repository } from 'typeorm';
import { ImageProcessService } from '../image-process/image-process.service';
import Client from "../../core/oos/ali"
import dayjs from "dayjs"

@Injectable()
export class AvatorService {
    constructor(
        @InjectRepository(Avator)
        private readonly avatorRepository: Repository<Avator>,
        private readonly imageProcess: ImageProcessService

    ) { }

    async store(data: UploadFileDto, user: User) {
        this.imageProcess.resizeAvator("uploads/avator", data.filename)
        return await this.avatorRepository.save(
            {
                ...data, user
            }
        )
    }

    async storeAli(data: UploadFileDto, user: User) {
        //上传头像 头像还需要裁剪

        const now = new Date()
        const date = dayjs(now).format("YYYY-MM-DD/")
        const res = await Client.put("avator/" + user.id + "/" + date + data.originalname, data.buffer);

        const url = res.url + "?x-oss-process=style/" + "avator-picture";
        await this.avatorRepository.save({
            filename: res.name, user, url: url

        })

        return res


    }

    //头像链接获取及展示
    async show(id: number) {
        return await this.avatorRepository.createQueryBuilder("avator")
            .where("avator.userid =:id", { id })
            .orderBy("created", "DESC")
            .getOne()

    }
}
