import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { PrismaModule } from './prisma/prisma.module';
import { DoacoesModule } from './doacoes/doacoes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CidadesModule } from './cidades/cidades.module';
import { EstadosModule } from './estados/estados.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      host: 'smtp.mailgun.org',
      secure: false,
      port: 587,
      auth: {
        user: ''
      }
    }),
    PessoasModule,
    PrismaModule,
    DoacoesModule,
    ProdutosModule,
    EstadosModule,
    CidadesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
