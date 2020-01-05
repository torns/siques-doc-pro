import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe, Res, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from '../file/file.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as userEntity } from '../user/user.entity';
import { AvatorService } from './avator.service';
import { Response } from 'express';

@Controller('avators')
export class AvatorController {
    constructor(
        private readonly avatorService: AvatorService
    ) { }

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor("avator"))
    async store(@UploadedFile() data: UploadFileDto, @User() user: userEntity) {
        console.log(data)
        return await this.avatorService.storeAli(data, user)
    }

    // @Get(":id")
    // async server(@Param("id", ParseIntPipe) id: number, @Res() res: Response, @Query("size") size: string) {
    //     const file = await this.avatorService.show(id)
    //     let { filename } = file
    //     if (size) {
    //         filename = `${filename}-${size}`;
    //     }
    //     res.sendFile(filename, {
    //         root: "uploads/avator",
    //         headers: {
    //             "Content-type": file.mimetype
    //         }
    //     })
    // }

    @Get(":id")
    async showAvator(@Param("id", ParseIntPipe) id: number) {
        return await this.avatorService.show(id)

    }
}
