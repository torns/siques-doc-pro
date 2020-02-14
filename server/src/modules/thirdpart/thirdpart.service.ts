import { Injectable } from '@nestjs/common';
import { ThirdPart } from './third.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ThirdpartService {
  constructor(
    @InjectRepository(ThirdPart)
    private readonly thirdRepository: Repository<ThirdPart>,
  ) {}

  async storeThirdPart(data: ThirdPart) {
    await this.thirdRepository.save(data);
  }
}
