import { Module } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from './doacoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoacaoRepository } from './repositories/doacoes.repository';

@Module({
  controllers: [DoacoesController],
  providers: [DoacoesService, DoacaoRepository, PrismaService],
})
export class DoacoesModule {}
