import { Injectable } from '@nestjs/common';
import { FisicaRepository } from './repositories/fisicas.repository';
import { CreateFisicaDto } from './dto/create-fisica.dto';
import { UpdateFisicaDto } from './dto/update-fisica.dto';
// import { CreatePessoaDto } from './dto/create-pessoa.dto';
// import { UpdatePessoaDto } from './dto/update-pessoa.dto';
// import { Prisma } from '@prisma/client';

@Injectable()
export class PessoasService {
  constructor(private readonly fisicaRepository: FisicaRepository) {}
  create(createFisicaDto: CreateFisicaDto) {
    return this.fisicaRepository.create(createFisicaDto);
  }

  findAll() {
    return this.fisicaRepository.findAll();
  }

  findOne(id: number) {
    return this.fisicaRepository.findOne(id);
  }
  update(id: number, updateFisicaDto: UpdateFisicaDto) {
    return this.fisicaRepository.update(id, updateFisicaDto);
  }

  remove(id: number) {
    return this.fisicaRepository.remove(id);
  }
}
