import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto, UserTagDto } from './tag.dto';
import { ApiTags } from '@nestjs/swagger';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';

@ApiTags('标签')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async store(@Body() data: TagDto) {
    return await this.tagService.store(data);
  }

  @Post('user/:id')
  async storeUserTags(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserTagDto,
  ) {
    await this.tagService.storeUserTag(id, data);
  }

  @Delete('user/:id')
  @UseGuards(AuthGuard())
  async deleteUserTags(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    await this.tagService.deleteUserTag(id, user.id);
  }

  @Get(':id')
  async storePostTags(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: any,
  ) {
    const { tagId } = query;
    await this.tagService.storePostTag(id, tagId);
  }

  @Get('user/:id')
  async getUserTag(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.showUserTag(id);
  }

  @Get('info/:id')
  async showTagInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.showTagInfo(id);
  }

  @Get('post/:id')
  async getTagPost(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.showTagPost(id);
  }

  @Put(':id')
  async updata(@Param('id', ParseIntPipe) id: number, @Body() data: TagDto) {
    return await this.tagService.updata(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.delete(id);
  }

  @Get(':id/listinit')
  async listInit() {
    await this.tagService.listInit();
  }

  @Get(':id/init')
  async tagsInit() {
    await this.tagService.tagsInit();
  }

  @Get()
  async getTags() {
    return await this.tagService.getTags();
  }
}
