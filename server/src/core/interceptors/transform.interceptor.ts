import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { } from 'src/modules/user/user.service';
import { PostService } from 'src/modules/post/post.service';

@Injectable()
export class TransformInterceptor implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {



    return next.handle()



  }
}
