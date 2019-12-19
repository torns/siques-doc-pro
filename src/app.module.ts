import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:"192.168.99.100",
      port:3306,
      username:'nest',
      password:'password',
      database:'nest',
      synchronize:true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    PostModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
