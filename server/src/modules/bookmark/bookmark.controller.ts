import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkDto } from './bookmark.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';

@Controller('bookmarks')
@UseGuards(AuthGuard())
export class BookmarkController {
  constructor(private readonly BookmarkService: BookmarkService) {}

  @Post()
  async createBookmark(@Body() data: BookmarkDto, @User() user: UserEntity) {
    return await this.BookmarkService.createBookmark(data, user);
  }

  @Get(':id')
  async showBookmark(@Param('id', ParseIntPipe) id: number) {
    return await this.BookmarkService.showBookmark(id);
  }
}
