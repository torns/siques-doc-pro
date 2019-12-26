import { Test, TestingModule } from '@nestjs/testing';
import { AvatorController } from './avator.controller';

describe('Avator Controller', () => {
  let controller: AvatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvatorController],
    }).compile();

    controller = module.get<AvatorController>(AvatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
