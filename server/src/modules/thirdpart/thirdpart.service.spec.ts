import { Test, TestingModule } from '@nestjs/testing';
import { ThirdpartService } from './thirdpart.service';

describe('ThirdpartService', () => {
  let service: ThirdpartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThirdpartService],
    }).compile();

    service = module.get<ThirdpartService>(ThirdpartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
