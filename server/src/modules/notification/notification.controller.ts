import { Controller, Get, UseGuards, Post, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { NotificationDto } from './noticication.dto';


@Controller('notification')
export class NotificationController {


    constructor(private readonly notificationService: NotificationService) { }

    @Get()
    @UseGuards(AuthGuard())
    async commentMessage(@User() user: UserEntity) {
        return await this.notificationService.commentMessage(user.id)
    }


    @Post()
    @UseGuards(AuthGuard())
    async storeLetter(@User() user: UserEntity, @Body() data: NotificationDto) {
        return await this.notificationService.storeLetter(user, data)
    }



}
