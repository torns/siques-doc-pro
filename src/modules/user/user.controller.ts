import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @Post()
    async create(@Body() data:UserDto){
        console.log(data)
        return await this.userService.store(data)
    }

    @Get(":id")
    // 排除用户密码
    @UseInterceptors(ClassSerializerInterceptor)
    async show(@Param() id:string){
        return await this.userService.show(id)
    }

    @Put(":id/password")
    @UseInterceptors(ClassSerializerInterceptor)
    async updataPassword(@Param("id") id:string,@Body() data:UpdatePasswordDto){
        return await this.userService.updataPassword(id,data);
    }
}
