import { Injectable } from '@nestjs/common';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { DoacaoRepository } from './repositories/doacoes.repository';

@Injectable()
export class DoacoesService {
  constructor(private readonly doacaoRepository: DoacaoRepository) {}
  create(createDoacaoDto: CreateDoacaoDto) {
    return this.doacaoRepository.create(createDoacaoDto);
  }

  findAll() {
    return this.doacaoRepository.findAll();
  }

  findOne(id: number) {
    return this.doacaoRepository.findOne(id);
  }

  remove(id: number) {
    return this.doacaoRepository.remove(id);
  }
}
