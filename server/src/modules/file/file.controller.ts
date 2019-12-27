import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { UploadFileDto } from './file.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('上传')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async store(@UploadedFile() data: UploadFileDto) {
    return await this.fileService.store(data);
  }

  //阿里云上传
  @Post("ali")
  @UseInterceptors(FileInterceptor('file'))
  async storeAli(@UploadedFile("file") file) {


    return await this.fileService.storeAli(file);
  }

  @Get('serve/:id')
  async serve(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const file = await this.fileService.show(id);
    res.sendFile(file.filename, {
      root: 'uploads',
      headers: {
        'content-type': file.mimetype,
      },
    });
  }
}
