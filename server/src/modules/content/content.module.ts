import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
