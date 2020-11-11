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
  Delete,
  SetMetadata,
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
import { PostService } from '../post/post.service';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { transcode } from 'buffer';
import { UserTagDto } from '../tag/tag.dto';
import { ActionService } from '../action/action.service';
import { ActionGuard } from 'src/core/guards/action.guard';

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly actionService: ActionService,
  ) {}

  // 创建用户
  @Post()
  async create(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.showMessage(id);
  }

  @Get(':id/validate')
  async validateNumber(@Param('id') id: string) {
    return await this.userService.findByAccount(id);
  }

  // 获取个人信息
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async showMessage(@User() user: userEntity) {
    return await this.userService.showMessage(user.id);
  }

  @Put('editor')
  @UseGuards(AuthGuard('jwt'))
  async changeEditor(@User() user: userEntity, @Body() body) {
    return await this.userService.changeEditor(user.id, body);
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updataPassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.userService.updataPassword(id, data);
  }

  // //修改密码
  // @Put(':id')
  // @UseGuards(AuthGuard('jwt'), AccessGuard)
  // //必须是admin角色才可以通过这条路由
  // @Permissions({ role: UserRole.ADMIN })
  // async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
  //   return await this.userService.update(id, data);
  // }

  // 更新用户信息
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
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

  // // 谁点过赞前端请求问题

  // @Get(':id/like')
  // @UseGuards(AuthGuard())
  // async userliked(@Param() data: string, @User() user: userEntity) {
  //
  //   return await this.userService.userliked(user.id)

  // }
  // 用户技能
  @Post(':id/skill')
  @UseGuards(AuthGuard())
  async skill(
    @User() user: userEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserTagDto,
  ) {
    return await this.userService.skill(user.id, data);
  }

  @Delete(':id/skill')
  @UseGuards(AuthGuard())
  async deleteSkill(
    @User() user: userEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserTagDto,
  ) {
    return await this.userService.deleteSkill(user.id, id);
  }

  @Get(':id/skill')
  async showUserSkill(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.fetchSkill(id);
  }

  //集合id
  @Get(':id/interest')
  @UseGuards(AuthGuard())
  async interest(
    @Param('id', ParseIntPipe) id: number,
    @User() user: userEntity,
  ) {
    return await this.userService.interest(id, user);
  }

  // 用户点赞
  @Get(':id/like')
  @UseGuards(ActionGuard)
  @SetMetadata('type', ['likepost'])
  @UseGuards(AuthGuard())
  async like(@Param('id', ParseIntPipe) id: number, @User() user: userEntity) {
    return await this.userService.like(id, user);
  }

  // 用户关注问题
  @Get(':id/concern')
  @UseGuards(ActionGuard)
  @SetMetadata('type', ['followque'])
  @UseGuards(AuthGuard())
  async concern(
    @Param('id', ParseIntPipe) id: number,
    @User() user: userEntity,
  ) {
    return await this.userService.userFollowQue(user.id, id);
  }
  // 用户关注的问题
  @Get(':id/concerned')
  async concerned(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.userFollwedQue(id);
  }

  // 用户关注的专栏
  @Get(':id/collection')
  async Userinterest(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.userFollowCollect(id);
  }

  // 文章受赞数量
  @Get(':id/liked/count')
  async countliked(@Param('id', ParseIntPipe) postId: number) {
    return this.userService.countliked(postId);
  }

  // 给谁点赞的具体信息

  @Get(':id/liked')
  @UseGuards(AuthGuard())
  @UseInterceptors(TransformInterceptor)
  async liked(@User() user: userEntity) {
    return this.userService.liked(user.id);
  }

  // 关注 id是要关注的用户的id
  @Get(':id/follow')
  @UseGuards(ActionGuard)
  @SetMetadata('type', ['followuser'])
  @UseGuards(AuthGuard())
  async follow(
    @User() user: userEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.follow(id, user.id);
  }

  //查询关注的所有人
  @Get(':id/follows')
  async getfollows(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getfollows(id);
  }

  //查询谁关注了自己
  @Get(':id/whofollows')
  async whofollows(
    @User() user: userEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.whofollows(id);
  }

  // 查询推荐的关注
  @Get(':id/recomend')
  async fetchRecFollow() {
    return await this.userService.getRecomendFollow();
  }

  // 查询所有
  @Get(':id/all')
  async fetchAll() {
    return await this.userService.countSite();
  }
}
