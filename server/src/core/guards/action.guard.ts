import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ActionService } from 'src/modules/action/action.service';
import { Reflector } from '@nestjs/core';
import { ActionDto } from 'src/modules/action/action.dto';
import e = require('express');

@Injectable()
export class ActionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly ActionService: ActionService,
  ) {}

  async storeAction(type: any, data: Partial<ActionDto>) {
    await this.ActionService.storeAction(type, data);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const type = this.reflector.get('type', context.getHandler());
    console.log(req.user, req.params, type[0]);
    let data: any;

    if (type[0] === 'likepost') {
      const alias = `${req.user.id + 'likepost' + req.params.id}`;
      data = {
        from_uid: req.user,
        alias: alias.toString(),
        to_Post: req.params,
      };
    }
    if (
      type[0] === 'followque' ||
      type[0] === 'commentpost' ||
      type[0] === 'createpost' ||
      type[0] === 'adoptanswer' ||
      type[0] === 'bookmarkpost'
    ) {
      const alias = `${req.user.id + type[0] + req.params.id}`;
      data = {
        from_uid: req.user,
        alias: alias.toString(),
        to_Post: req.params,
      };
    }

    if (type[0] === 'followuser') {
      const alias = `${req.user.id + 'followuser' + req.params.id}`;
      data = {
        from_uid: req.user,
        alias: alias.toString(),
        to_uid: req.params,
      };
    }

    this.storeAction(type, data);
    return true;
  }
}
