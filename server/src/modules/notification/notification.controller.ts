import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';


@Controller('notification')
export class NotificationController {


    constructor(private readonly notificationService: NotificationService) { }

    @Get()
    @UseGuards(AuthGuard())
    async commentMessage(@User() user: UserEntity) {
        return this.notificationService.commentMessage(user.id)
    }



}
