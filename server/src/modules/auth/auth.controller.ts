import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Get('url')
  async fetchUrl() {
    return await this.authService.fetchUrl();
  }

  @Get(':code/signToken')
  async signToken(@Param('code') id: any) {
    return await this.authService.signWeiboToken(id);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  async authTest(@User() user) {
    console.log(user);
    return {
      message: 'ok',
    };
  }
}
