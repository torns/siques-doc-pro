import { UserRole } from '../enums/user-role.enum';
import { Possession } from '../enums/possession.enum';

export interface PermissionInterface {
  role: UserRole;
  resource: string;
  //权限
  possession: Possession;
}
