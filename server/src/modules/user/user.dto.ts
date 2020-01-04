import { Role } from '../role/role.entity';

export class UserDto {
  readonly phonenumber: string;
  readonly name: string;
  readonly password: string;
  readonly roles: Role[];
  readonly city: string;
  readonly school: string;
  readonly organization: string;
  readonly website: string;
  readonly introduction: string;
}

export class UpdatePasswordDto {
  readonly password: string;
  readonly newpassword: string;
}
