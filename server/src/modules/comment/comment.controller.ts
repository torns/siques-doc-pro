import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './comment.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ReplyDto } from './reply.dto';

@ApiTags('评论')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) { }


  // 评论
  @Post('posts/:id/comments')
  @UseGuards(AuthGuard('jwt'))

  async storePostComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
    @User() user: UserEntity,
  ) {
    return await this.commentService.storePostComment(id, user, data);
  }

  // 跟楼回复
  // @Post("posts/:id/reply")
  // @UseGuards(AuthGuard())
  // async storePostReply(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body("parentid") parentid: CommentDto,
  //   @User() user: UserEntity,
  //   @Body() data: CommentDto
  // ) {
  //   console.log(data)
  //   return await this.commentService.storePostReply(id, user, data, parentid)
  // }

  @Post("posts/:id/reply")
  @UseGuards(AuthGuard())
  async storePostReply(
    @User() user: UserEntity,
    @Body() data: ReplyDto
  ) {

    return await this.commentService.storePostReply(data, user)
  }




  @Put('comments/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
  ) {
    return this.commentService.update(id, data);
  }

  @Delete('comments/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.delete(id);
  }

  //统计一篇文章的评论
  @Get('posts/:id/comments')
  async showPostComments(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.showPostComments(id);
  }

  @Get('users/:id/comments')
  async showUserComments(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.showUserComments(id);
  }
}
