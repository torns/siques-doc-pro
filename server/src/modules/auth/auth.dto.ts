import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '账号' })
  readonly phonenumber: string;
  @ApiProperty({ description: '密码' })
  readonly password: string;
}
