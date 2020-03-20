import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { CommentModule } from './modules/comment/comment.module';
import { RoleModule } from './modules/role/role.module';
import { FileModule } from './modules/file/file.module';
import { CollectionModule } from './modules/collection/collection.module';
import { AvatorModule } from './modules/avator/avator.module';
import { ImageProcessModule } from './modules/image-process/image-process.module';
import { SmsModule } from './modules/sms/sms.module';
import { NotificationModule } from './modules/notification/notification.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { ContentModule } from './modules/content/content.module';
import { ActionModule } from './modules/action/action.module';

import dotenv from 'dotenv';
import { ActionMiddleware } from './core/middleware/action.middleware';
import { PostController } from './modules/post/post.controller';
import { UserController } from './modules/user/user.controller';
import { ThirdpartModule } from './modules/thirdpart/thirdpart.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      charset: 'utf8mb4',
      port: 3306,
      username: 'nest',
      password: process.env.TYPEORM_PASSWORD,
      database: 'nest',
      // logging: 'all',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    PostModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TagModule,
    CommentModule,
    RoleModule,
    FileModule,
    CollectionModule,
    AvatorModule,
    ImageProcessModule,
    SmsModule,
    NotificationModule,
    BookmarkModule,
    ContentModule,
    ActionModule,
    ThirdpartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ActionMiddleware).forRoutes(UserController);
  }
}
