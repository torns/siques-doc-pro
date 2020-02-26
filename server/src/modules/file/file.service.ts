import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
// import * as client from "../../core/oos/ali";
import dayjs from 'dayjs';
import OSS = require('ali-oss');

let client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI4FqfKWi8iLykHAiRg1Go',
  accessKeySecret: 'INM7qOizdwjIUCRHMTbmXqzzAfk4s3',
  bucket: 'shuxie',
  secure: true,
});

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
    const date = dayjs(now).format('YYYY-MM-DD');

    //上传图片
    const res = await client.put(
      id + '/' + date + '/' + file.originalname,
      file.buffer,
    );
    return res;
  }
}
