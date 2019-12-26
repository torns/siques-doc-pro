import { Injectable } from '@nestjs/common';
import { UploadFileDto } from '../file/file.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Avator } from './avator.entity';
import { Repository } from 'typeorm';
import { ImageProcessService } from '../image-process/image-process.service';

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

    async show(id: number) {
        return await this.avatorRepository.findOne(id);
    }
}
