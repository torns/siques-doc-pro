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
  SetMetadata,
  Req,
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
import { ActionService } from '../action/action.service';
import { ActionGuard } from 'src/core/guards/action.guard';

@ApiTags('文章')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly actionService: ActionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() data: PostDto, @User() user: UserEntity) {
    return await this.postService.store(data, user);
  }

  @Get(':id/user')
  @UseInterceptors(ClassSerializerInterceptor)
  async index(
    @ListOptions({ limit: 10, sort: 'updated', order: 'DESC' }) //updated降序 ASC DESC
    Options: ListOptionsInterface,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.postService.index(Options, id);
  }

  @Get('all')
  async getAll(
    @ListOptions({ limit: 10, sort: 'liked', order: 'DESC' }) //updated降序 ASC DESC
    Options: ListOptionsInterface,
  ) {
    console.log(Options);
    return await this.postService.getAll(Options);
  }

  @Get('collections/:id')
  @UseGuards(AuthGuard('jwt'))
  async showPost(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.showPost(id);
  }

  // 获取用户所有未分类的笔记
  @Get(':id/note')
  async showUserNote(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.showUserNote(id);
  }

  @Get(':id')
  // @UseGuards(AuthGuard())
  async show(@Param('id') id: string, @Query() query: any) {
    return await this.postService.show(id, query);
  }

  @Put(':id')
  // @ApiQuery({ name: 'role', enum: UserRole })
  @UseGuards(ActionGuard)
  @SetMetadata('type', ['createpost'])
  @UseGuards(AuthGuard(), AccessGuard)

  //用户需要拥有这条资源的所有权才可以修改
  @Permissions({
    resource: Resource.POST,
    possession: Possession.OWN,
    // role: UserRole.USER,
  })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<PostDto>,
    @User() user: UserEntity,
  ) {
    console.log(user);
    return await this.postService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param() id: string, @Query() data: any) {
    const { collectionId } = data;
    console.log(data);
    await this.postService.delete(id, parseInt(collectionId));
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

  // @Get(':id/liked')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async liked(@Param('id', ParseIntPipe) id: number) {
  //   return await this.postService.liked(id);
  // }

  // 提问采纳答案
  @Get(':id/adopt')
  @UseGuards(ActionGuard)
  @SetMetadata('type', ['adoptanswer'])
  @UseGuards(AuthGuard())
  async adoptAnswer(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.postService.adoptAnswer(id, req.query.answerId);
  }

  // 点赞
  @Get(':id/like')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async like(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return this.postService.like(id, user);
  }

  // 文章受赞数量
  @Get(':id/liked/count')
  async countliked(@Param('id', ParseIntPipe) id: number) {
    return this.postService.countliked(id);
  }

  // 文章被谁点过的具体信息
  @Get(':id/liked')
  async liked(@Param('id', ParseIntPipe) id: number) {
    return this.postService.liked(id);
  }

  // 文章搜索

  @Get(':key/search')
  async fuzzySearch(@Param('key') key: string) {
    return this.postService.serchData(key);
  }

  // // 喜欢的文章
  // @Get(":id/liked_posts")
  // @UseGuards(AuthGuard())
  // async liked_posts(@User() user: UserEntity) {

  //   return await this.postService.liked_posts(user.id)
  // }
  // 返回所有文章或者笔记的序列
  @Get('seo/sitemap')
  async getSitemap() {
    return this.postService.getSitemap();
  }
}
