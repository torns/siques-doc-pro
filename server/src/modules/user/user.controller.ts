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
import { get } from 'http';
import { User } from 'src/core/decorators/user.decorators';
import { User as userEntity } from './user.entity';

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() data: UserDto) {
    console.log(data);
    return await this.userService.store(data);
  }

  @Get(':id')
  // 排除用户密码
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.show(id);
  }

  @Put("editor")
  @UseGuards(AuthGuard("jwt"))

  async changeEditor(@User() user: userEntity, @Body() body) {

    return await this.userService.changeEditor(user.id, body);
  }

  //获取编辑器的路由
  @Get()
  @UseGuards(AuthGuard("jwt"))
  async showEditor(@User() user: userEntity) {
    return await this.userService.showEditor(user.id);
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
