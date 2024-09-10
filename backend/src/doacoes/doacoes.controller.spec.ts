import { Test, TestingModule } from '@nestjs/testing';
import { DoacoesController } from './doacoes.controller';
import { DoacoesService } from './doacoes.service';

describe('DoacoesController', () => {
  let controller: DoacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoacoesController],
      providers: [DoacoesService],
    }).compile();

    controller = module.get<DoacoesController>(DoacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
