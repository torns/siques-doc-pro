import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('角色')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async store(@Body() data: RoleDto) {
    return await this.roleService.store(data);
  }
}
