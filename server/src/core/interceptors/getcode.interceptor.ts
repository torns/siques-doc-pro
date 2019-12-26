import { CallHandler, ExecutionContext, Injectable, NestInterceptor, CacheInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GetCodeInterceptor extends CacheInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const result = await this.cacheManager.get('smsKey');
    console.log(result)
    return next.handle().pipe(map(data => ({ result })));
  }
}