import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {File} from "./file.entity"
@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRespository:Repository<File>
    ){}
    async store(data: UploadFileDto) {
        return await this.fileRespository.save(data);
    }

    async show (id:number){
        return await this.fileRespository.findOne(id);
    }
    
}
