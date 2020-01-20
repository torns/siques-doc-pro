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
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';
import { ApiTags } from '@nestjs/swagger';
import { async } from 'rxjs/internal/scheduler/async';

@ApiTags('标签')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async store(@Body() data: TagDto) {
    return await this.tagService.store(data);
  }

  @Get(':id')
  async storePostTags(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: any,
  ) {
    const { tagId } = query;
    await this.tagService.storePostTag(id, tagId);
  }

  @Put(':id')
  async updata(@Param('id', ParseIntPipe) id: number, @Body() data: TagDto) {
    return await this.tagService.updata(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.delete(id);
  }

  @Get('listinit')
  async listInit() {
    await this.tagService.listInit();
  }

  @Get('init')
  async tagsInit() {
    await this.tagService.tagsInit();
  }

  @Get()
  async getTags() {
    return await this.tagService.getTags();
  }
}
