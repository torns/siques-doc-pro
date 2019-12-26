import { Test, TestingModule } from '@nestjs/testing';
import { ImageProcessService } from './image-process.service';

describe('ImageProcessService', () => {
  let service: ImageProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageProcessService],
    }).compile();

    service = module.get<ImageProcessService>(ImageProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
