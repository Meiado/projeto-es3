import { Module } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from './doacoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoacaoRepository } from './repositories/doacoes.repository';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [DoacoesController],
  providers: [DoacoesService, DoacaoRepository, MailService, PrismaService],
})
export class DoacoesModule {}
