import { Module, BadRequestException } from '@nestjs/common';
import { AvatorController } from './avator.controller';
import { AvatorService } from './avator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avator } from './avator.entity';
import { MulterModule } from '@nestjs/platform-express';
import { callbackify } from 'util';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avator]),
    MulterModule.register({
      dest: "./uploads/avator",
      fileFilter: (req, file, callback) => {
        const mimetype = ["image/png", "image/jpg", "image/jpeg"]
        const allowed = mimetype.some(type => type === file.mimetype)

        if (allowed) {
          callback(null, true)
        } else {
          callback(new BadRequestException("不支持上传此文件"), false)
        }
      }
    }),
    AuthModule
  ],
  controllers: [AvatorController],
  providers: [AvatorService]
})
export class AvatorModule { }
