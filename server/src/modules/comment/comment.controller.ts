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
  SetMetadata,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './comment.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ReplyDto } from './reply.dto';
import { ActionGuard } from 'src/core/guards/action.guard';

@ApiTags('评论')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 评论
  @Post('posts/:id/comments')
  @UseGuards(ActionGuard)
  @SetMetadata('type', ['commentpost'])
  @UseGuards(AuthGuard('jwt'))
  async storePostComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
    @User() user: UserEntity,
  ) {
    return await this.commentService.storePostComment(id, user, data);
  }

  @Get('comment/:id')
  @UseGuards(AuthGuard())
  async showComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.showComment(id);
  }

  @Get('reply/:id')
  @UseGuards(AuthGuard())
  async showReply(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.showReply(id);
  }

  @Post('posts/:id/reply')
  @UseGuards(AuthGuard())
  async storePostReply(@User() user: UserEntity, @Body() data: ReplyDto) {
    return await this.commentService.storePostReply(data, user);
  }

  //评论点赞 id是主评论的编号 以及一个用户得id
  @Get('posts/:id/comments/like')
  @UseGuards(AuthGuard())
  async PostCommentLike(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.commentService.PostCommentLike(id, user.id);
  }

  // 获取用户所有的回答
  @Get('users/:id/answer')
  async showUserAnswer(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.showUserAnswer(id);
  }

  @Put('comments/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
  ) {
    return this.commentService.update(id, data);
  }

  @Put('reply/:id')
  async updateReply(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
  ) {
    return this.commentService.updateReply(id, data);
  }

  @Delete('comments/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.delete(id);
  }

  @Delete('reply/:id')
  async deleteReply(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteReply(id);
  }

  //统计一篇文章的评论
  @Get('posts/:id/comments')
  async showPostComments(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.showPostComments(id);
  }

  //统计一篇文章的子评论
  // @Get('posts/:id/reply')
  // async showPostReply(@Param('id', ParseIntPipe) id: number) {
  //   return await this.commentService.showPostReply();
  // }

  // 获取用户所有评论
  @Get('users/:id/comments')
  async showUserComments(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.showUserComments(id);
  }

  // 获取热门评论
  @Get('comments')
  async showHotComments() {
    return await this.commentService.showHotComments();
  }
}
