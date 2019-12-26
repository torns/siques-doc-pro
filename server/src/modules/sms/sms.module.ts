import { Module, CacheModule } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60, // seconds
    })
  ],
  controllers: [SmsController],
  providers: [SmsService, AppService]
})
export class SmsModule { }
