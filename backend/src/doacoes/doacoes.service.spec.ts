import { Test, TestingModule } from '@nestjs/testing';
import { DoacoesService } from './doacoes.service';

describe('DoacoesTService', () => {
  let service: DoacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoacoesService],
    }).compile();

    service = module.get<DoacoesService>(DoacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
