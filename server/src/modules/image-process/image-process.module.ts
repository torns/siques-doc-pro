import { Module, Global } from '@nestjs/common';
import { ImageProcessService } from './image-process.service';


@Global()
@Module({
  providers: [ImageProcessService],
  exports: [ImageProcessService]
})
export class ImageProcessModule { }
