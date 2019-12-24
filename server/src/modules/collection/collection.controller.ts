import { Controller, Post, UseGuards, Param, Body, Get, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { AuthGuard } from '@nestjs/passport';
import { CollectionDto } from './collection.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';

@Controller('collections')
@UseGuards(AuthGuard("jwt"))
@ApiTags('集合')
export class CollectionController {
    constructor(
        private readonly CollectionService: CollectionService
    ) { }

    @Post()
    async storeCollection(@Body() data: CollectionDto, @User() user: UserEntity, ) {
        return await this.CollectionService.store(user, data)

    }

    @Get()
    async showCollection(@User() user: UserEntity) {

        return await this.CollectionService.showCollection(user.id)
    }

    @Delete(":id")
    async removeCollection(@Param("id", ParseIntPipe) id: number) {
        return await this.CollectionService.removeCollection(id)
    }
}
