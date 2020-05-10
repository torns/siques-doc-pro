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

    if (res.length == 0) {
      const entity: PushDto = { url };
      this.pushRepository.save(entity);

      return true;
    } else {
      //   const now: any = new Date();

      const now: any = new Date();

      //   const oldtime1 = now.getDate();

      //   const newtime = now.setDate(oldtime1 + 20);
      //   const newdate1 = new Date(newtime);

      //   console.log((now - res[0].push_created) / 1000 / 60 / 60 / 24);

      const canPush =
        (now - res[0].push_created) / 1000 / 60 / 60 / 24 -
          res[0].push_pushTime * 10 >=
        10;

      if (canPush) {
        this.update(now, res[0].push_id);
      }

      return canPush;
    }
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
