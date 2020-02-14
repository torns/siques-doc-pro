import { Test, TestingModule } from '@nestjs/testing';
import { ThirdpartController } from './thirdpart.controller';

describe('Thirdpart Controller', () => {
  let controller: ThirdpartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThirdpartController],
    }).compile();

    controller = module.get<ThirdpartController>(ThirdpartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
