import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Push } from './push.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PushDto } from './push.dto';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Push)
    private readonly pushRepository: Repository<Push>,
  ) {}

  async push(url: any) {
    // 路由不符合的话
    if (url.indexOf('#') != -1 || url.indexOf('?') != -1) {
      return false;
    }

    const res = await this.pushRepository
      .createQueryBuilder('push')
      .where('push.url Like :url')
      .setParameters({
        url: '%' + url + '%',
      })
      .execute();

    // 没有推送过的话
    if (res.length == 0) {
      const entity: PushDto = { url };
      this.pushRepository.save(entity);

      return true;
    }

    return false;
  }

  async update(newtime: Date, id: number) {
    await this.pushRepository
      .createQueryBuilder('push')
      .update()
      .where('push.id=:id', { id })
      .set({ updated: newtime, pushTime: () => 'pushTime + 1' })

      .execute();
  }
}
