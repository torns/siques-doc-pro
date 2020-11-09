import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadFileDto } from './file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import Client from '../../core/oos/ali';
// import * as client from "../../core/oos/ali";
import dayjs from 'dayjs';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRespository: Repository<File>,
  ) {}
  async store(data: UploadFileDto) {
    return await this.fileRespository.save(data);
  }

  async show(id: number) {
    return await this.fileRespository.findOne(id);
  }

  async storeAli(file, id: number) {
    const now = new Date();
    // 以月份为单位存储
    const date = dayjs(now).format('YYYY-MM');

    //文章上传图片

    const res = await Client.put(
      'post/' + id + '/' + date + '/' + file.size + file.originalname,
      file.buffer,
    );

    return res;
  }
}
