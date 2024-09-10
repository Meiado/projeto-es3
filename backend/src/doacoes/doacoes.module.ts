import { Module } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from './doacoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoacaoRepository } from './repositories/doacoes.repository';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [DoacoesController],
  providers: [DoacoesService, EmailService, DoacaoRepository, PrismaService],
})
export class DoacoesModule {}
