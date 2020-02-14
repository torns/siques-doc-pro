import { Module } from '@nestjs/common';
import { ThirdpartController } from './thirdpart.controller';
import { ThirdpartService } from './thirdpart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdPart } from './third.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThirdPart])],
  controllers: [ThirdpartController],
  providers: [ThirdpartService],
})
export class ThirdpartModule {}
