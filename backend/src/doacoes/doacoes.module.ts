import { Module } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from './doacoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoacaoRepository } from './repositories/doacoes.repository';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org',
        secure: false,
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: '""',
      },
    }),
  ],
  controllers: [DoacoesController],
  providers: [DoacoesService, DoacaoRepository, PrismaService],
})
export class DoacoesModule {}
