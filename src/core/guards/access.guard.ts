import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PermissionInterface } from '../decorators/permission.interface';
import { User } from 'src/modules/user/user.entity';
import { UserRole } from '../enums/user-role.enum';
import { Possession } from '../enums/possession.enum';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector:Reflector,
    private readonly userService:UserService
  ){}

  async validatePermissons(permissions:PermissionInterface[],
    user:User,resourceId:number){
      const results =permissions.map(async permission=>{
        const {role,resource,possession}= permission;

        let hasrole:boolean = true;
        let hasPossession:boolean  = true;

        if(possession ===Possession.OWN){
          hasPossession =await this.userService.possess(user.id,resource,resourceId)
        }
        
        
        if(role){
          hasrole = user.roles.some(UserRole=>UserRole.name= role)
        }

        return hasrole && hasPossession
      } );
      return Promise.all(results)
  }

 async  canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get(
      "permissions",context.getHandler()
    )

    const results =await this.validatePermissons(
      permissions,
      request.user,
      parseInt(request.params.id)
    )
 
    return results.includes(true);
  }
}
