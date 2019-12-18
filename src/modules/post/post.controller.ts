import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';


@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async store(@Body() data: PostDto, @User() user: UserEntity) {
        console.log(data)
        return await this.postService.store(data, user)
    }


    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async index() {
        return await this.postService.index()
    }



    @Get(':id')
    async show(@Param("id") id: string) {
        console.log(id)
        return await this.postService.show(id)
    }

    @Put(':id')
    async update(@Param("id") id: string, @Body() data: Partial<PostDto>) {
        console.log(data)
        return await this.postService.update(id, data)
    }

    @Delete(":id")
    async delete(@Param() id: string) {
        return await this.postService.delete(id)

    }


    @Post(":id/vote")
    @UseGuards(AuthGuard("jwt"))
    async vote(
        @Param("id", ParseIntPipe) id: number,
        @User() user: UserEntity,
    ) {

        return await this.postService.vote(id, user);
    }


    @Delete(":id/vote")
    @UseGuards(AuthGuard("jwt"))
    async unvote(
        @Param("id", ParseIntPipe) id: number,
        @User() user: UserEntity,

    ) {

        return await this.postService.unvote(id, user);
    }


    @Get(":id/liked")
    @UseInterceptors(ClassSerializerInterceptor)
    async liked(@Param("id",ParseIntPipe) id:number){
        return await this.postService.liked(id);
    }

}