import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from 'src/core/guards/access.guard';
import { UserRole } from 'src/core/enums/user-role.enum';
import { Permissions } from 'src/core/decorators/permissions.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDto) {
    console.log(data);
    return await this.userService.store(data);
  }

  @Get(':id')
  // 排除用户密码
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param() id: string) {
    return await this.userService.show(id);
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updataPassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.userService.updataPassword(id, data);
  }

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(@Param('id', ParseIntPipe) id: number) {
    return this.userService.liked(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AccessGuard)
  //必须是admin角色才可以通过这条路由
  @Permissions({ role: UserRole.ADMIN })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
    return await this.userService.update(id, data);
  }

  //验证
  @Get(':id/possess/:resource/:resourceId')
  async pocess(
    @Param('id', ParseIntPipe) id: number,
    @Param('resource') resource: string,
    @Param('resourceId', ParseIntPipe) resourceId: number,
  ) {
    return await this.userService.possess(id, resource, resourceId);
  }
}
