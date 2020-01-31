import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get(':id')
  async showUserAction(@Param('id', ParseIntPipe) id: number) {
    return this.actionService.fetchUserAction(id);
  }
}
