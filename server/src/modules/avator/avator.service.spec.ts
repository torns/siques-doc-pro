import { Test, TestingModule } from '@nestjs/testing';
import { AvatorService } from './avator.service';

describe('AvatorService', () => {
  let service: AvatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvatorService],
    }).compile();

    service = module.get<AvatorService>(AvatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
