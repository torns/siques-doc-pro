import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Push } from './push.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Push])],
  providers: [PushService],
  controllers: [PushController],
  exports: [PushService],
})
export class PushModule {}
