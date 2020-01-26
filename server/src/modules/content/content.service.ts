import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async questionContentInit() {}
}
