import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection])
  ],
  controllers: [CollectionController],
  providers: [CollectionService]
})
export class CollectionModule { }
