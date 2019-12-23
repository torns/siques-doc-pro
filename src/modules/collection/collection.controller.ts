import { Controller, Post, UseGuards, Param, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { AuthGuard } from '@nestjs/passport';
import { CollectionDto } from './collection.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';

@Controller('collections')
@ApiTags('集合')
export class CollectionController {
    constructor(
        private readonly CollectionService: CollectionService
    ) { }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async storeCollection(@Body() data: CollectionDto, @User() user: UserEntity, ) {
        return await this.CollectionService.store(user, data)

    }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async showCollection(@User() user: UserEntity) {

        return await this.CollectionService.showCollection(user.id)
    }

}
