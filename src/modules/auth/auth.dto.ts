import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '账号' })
  readonly name: string;
  @ApiProperty({ description: '密码' })
  readonly password: string;
}
