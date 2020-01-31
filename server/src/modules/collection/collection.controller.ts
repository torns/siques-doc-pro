import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Get,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { AuthGuard } from '@nestjs/passport';
import { CollectionDto } from './collection.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';

@Controller('collections')
@ApiTags('集合')
export class CollectionController {
  constructor(private readonly CollectionService: CollectionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async storeCollection(@Body() data: CollectionDto, @User() user: UserEntity) {
    return await this.CollectionService.store(user, data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async showCollection(@User() user: UserEntity) {
    return await this.CollectionService.showCollection(user.id);
  }

  //这里传入的是用户id
  @Get(':id/user')
  @UseGuards(AuthGuard('jwt'))
  async getUserCollection(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.getUserCollection(id);
  }

  //这里传入的是集合id
  @Get(':id')
  async getCollection(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.getCollection(id);
  }

  @Get(':id/post')
  async getPostCollection(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.getPostCollection(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async removeCollection(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.removeCollection(id);
  }
}
