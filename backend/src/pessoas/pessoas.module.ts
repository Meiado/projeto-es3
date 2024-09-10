import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { FisicaRepository } from './repositories/fisicas.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PessoasController],
  providers: [PessoasService, FisicaRepository, PrismaService],
  exports: [PessoasService],
})
export class PessoasModule {}
