import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from './repositories/produtos.repository';

@Injectable()
export class ProdutosService {
  constructor(private readonly produtosRepository: ProdutosRepository) {}
  findAll() {
    return this.produtosRepository.findAll();
  }

  findOne(id: number) {
    return this.produtosRepository.findOne(id);
  }
}
