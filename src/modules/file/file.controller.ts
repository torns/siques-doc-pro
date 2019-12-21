import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { FileService } from './file.service';
import { UploadFileDto } from './file.dto';
import { Response } from 'express';


@Controller('files')
export class FileController {
    constructor(
        private readonly fileService: FileService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async store(@UploadedFile() data: UploadFileDto) {
        return await this.fileService.store(data)
    }

    @Get("serve/:id")
    async serve(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
        const file = await this.fileService.show(id);
        res.sendFile(file.filename, {
            root: "uploads",
            headers: {
                "content-type": file.mimetype
            }
        })
    }
}
