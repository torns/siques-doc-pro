import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AutoincrementInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()

    return next.handle().pipe(
      tap(data => {

        const { entities, userId } = data;
        if (entities.user.id == userId) {
          return
        } else {
          entities.views = entities.views + 1
        }
        console.log(entities)
        return entities
      })
    );
  }
}
