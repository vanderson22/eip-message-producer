import { Test, TestingModule } from '@nestjs/testing';
import { ProcessMessageController } from './process-message.controller';

describe('ProcessMessageController', () => {
  let controller: ProcessMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessMessageController],
    }).compile();

    controller = module.get<ProcessMessageController>(ProcessMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
