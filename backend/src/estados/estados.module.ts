import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { EstadosRepository } from './repositories/estados.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EstadosController],
  providers: [EstadosService, EstadosRepository, PrismaService],
  exports: [EstadosService],
})
export class EstadosModule {}
