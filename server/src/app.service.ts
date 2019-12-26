import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async createdCode() {

    return await Math.random().toString(36).substr(2, 4);
  }
}
