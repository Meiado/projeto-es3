import { Module } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CidadesController } from './cidades.controller';
import { CidadesRepository } from './repositories/cidades.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CidadesController],
  providers: [CidadesService, CidadesRepository, PrismaService],
})
export class CidadesModule {}
