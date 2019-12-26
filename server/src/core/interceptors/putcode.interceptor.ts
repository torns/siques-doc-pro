import { CallHandler, ExecutionContext, Injectable, CacheInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PutcodeInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return 'smsKey';
  }
}