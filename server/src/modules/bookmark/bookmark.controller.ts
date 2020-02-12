import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkDto } from './bookmark.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { ActionGuard } from 'src/core/guards/action.guard';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly BookmarkService: BookmarkService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createBookmark(@Body() data: BookmarkDto, @User() user: UserEntity) {
    await this.BookmarkService.createBookmark(data, user);
  }

  //查询用户收藏夹信息
  @Get(':id/user')
  async showUserBookmark(@Param('id', ParseIntPipe) id: number) {
    return await this.BookmarkService.showUserBookmark(id);
  }

  //查询单个收藏夹的信息
  @Get(':id')
  async showBookmark(@Param('id', ParseIntPipe) id: number) {
    return await this.BookmarkService.showBookmark(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBookmark(@Param('id', ParseIntPipe) id: number) {
    return await this.BookmarkService.deleteBookmark(id);
  }

  @Get(':id/post')
  @UseGuards(ActionGuard)
  @SetMetadata('type', ['bookmarkpost'])
  @UseGuards(AuthGuard())
  async bookmarkPost(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: any,
  ) {
    await this.BookmarkService.bookmarkPost(id, query);
  }
}
