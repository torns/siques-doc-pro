import { Module, BadRequestException } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    AuthModule
    // MulterModule.register({
    //   dest: './uploads',
    //   fileFilter: (req, file, callback) => {
    //     const mimetypes = ['image/png', 'image/jpg'];
    //     const allowed = mimetypes.some(type => type === file.mimetype);

    //     if (allowed) {
    //       callback(null, true);
    //     } else {
    //       callback(new BadRequestException('不支持'), false);
    //     }
    //   },
    // }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule { }
