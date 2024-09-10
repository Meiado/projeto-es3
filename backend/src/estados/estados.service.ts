import { Injectable } from '@nestjs/common';
import { EstadosRepository } from './repositories/estados.repository';

@Injectable()
export class EstadosService {
  constructor(private readonly estadosRepository: EstadosRepository) {}
  findAll() {
    return this.estadosRepository.findAll();
  }

  findOne(id: number) {
    return this.estadosRepository.findOne(id);
  }
  findBySigla(sigla: string) {
    return this.estadosRepository.findBySigla(sigla);
  }
}
