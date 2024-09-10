import { Injectable } from '@nestjs/common';
import { CidadesRepository } from './repositories/cidades.repository';

@Injectable()
export class CidadesService {
  constructor(private readonly cidadesRepository: CidadesRepository) {}

  findAll() {
    return this.cidadesRepository.findAll();
  }

  findOne(id: number) {
    return this.cidadesRepository.findOne(id);
  }
  findByEstado(id: number) {
    return this.cidadesRepository.findByEstado(id);
  }
}
