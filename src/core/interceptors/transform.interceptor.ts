import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map(data => {
        const [entites, total] = data;
        // console.log(request)
        // 在反应头里添加数量
        request.res.header('X-Total-Count', total);
        return entites;
      }),
    );
  }
}
