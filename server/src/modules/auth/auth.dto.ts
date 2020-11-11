import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '账号' })
  readonly account: string;
  @ApiProperty({ description: '密码' })
  readonly password: string;
  name: string;
  thirdpart: boolean;
  phoneLogin: boolean;
  uid: string;
  verification: number;
}
