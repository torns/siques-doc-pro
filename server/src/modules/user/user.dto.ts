import { Role } from '../role/role.entity';

export class UserDto {
  readonly phonenumber: string;
  name: string;
  password: string;
  uid: string;
  readonly roles: Role[];
  readonly city: string;
  readonly school: string;
  readonly organization: string;
  readonly website: string;
  readonly introduction: string;
  location: any;
}

export class UpdatePasswordDto {
  readonly password: string;
  readonly newpassword: string;
}
