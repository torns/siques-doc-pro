import {
  Controller,
  Get,
  UseGuards,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { NotificationDto } from './noticication.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(AuthGuard())
  async commentMessage(@User() user: UserEntity) {
    return await this.notificationService.commentMessage(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async showUserLetter(@Param('id', ParseIntPipe) id: number) {
    return await this.notificationService.showUserLetter(id);
  }

  // id是私信对象的id
  @Post(':id')
  @UseGuards(AuthGuard())
  async storeLetter(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
    @Body() data: NotificationDto,
  ) {
    return await this.notificationService.storeLetter(user, id, data);
  }
}
