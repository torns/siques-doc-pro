import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Options,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { ListOptions } from 'src/core/decorators/list-options.decorators';
import { ListOptionsInterface } from 'src/core/interface/list-options.interface';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Resource } from 'src/core/enums/resource.enum';
import { Permissions } from 'src/core/decorators/permissions.decorators';
import { Possession } from 'src/core/enums/possession.enum';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/core/enums/user-role.enum';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AutoincrementInterceptor } from 'src/core/interceptors/autoincrement.interceptor';

@ApiTags('文章')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() data: PostDto, @User() user: UserEntity) {

    return await this.postService.store(data, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async index(
    @ListOptions({ limit: 10, sort: 'updated', order: 'DESC' }) //updated降序 ASC DESC
    Options: ListOptionsInterface, @User() user: UserEntity
  ) {

    return await this.postService.index(Options, user.id);
  }


  @Get("all")
  @UseInterceptors(TransformInterceptor)
  async getAll(@ListOptions({ limit: 10, sort: 'updated', order: 'DESC' }) //updated降序 ASC DESC
  Options: ListOptionsInterface
  ) {

    return await this.postService.getAll(Options);
  }

  @Get("collections/:id")
  @UseGuards(AuthGuard('jwt'))
  async showPost(@Param("id", ParseIntPipe) id: number) {
    return await this.postService.showPost(id)
  }

  @Get(':id')
  @UseGuards(AuthGuard())

  async show(@Param('id') id: string, @User() user: UserEntity) {
    // console.log(id)

    return await this.postService.show(id, user);


  }

  @Put(':id')
  // @ApiQuery({ name: 'role', enum: UserRole })
  @UseGuards(AuthGuard("jwt"), AccessGuard)
  //用户需要拥有这条资源的所有权才可以修改
  @Permissions({
    resource: Resource.POST,
    possession: Possession.OWN,
    // role: UserRole.USER,
  })
  async update(@Param('id') id: string, @Body() data: Partial<PostDto>) {

    return await this.postService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return await this.postService.delete(id);
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard())
  async vote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return await this.postService.vote(id, user);
  }

  @Delete(':id/vote')
  @UseGuards(AuthGuard())
  async unvote(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.postService.unvote(id, user);
  }

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.liked(id);
  }
}
