import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { PrismaModule } from './prisma/prisma.module';
import { DoacoesModule } from './doacoes/doacoes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CidadesModule } from './cidades/cidades.module';
import { EstadosModule } from './estados/estados.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    PessoasModule,
    PrismaModule,
    DoacoesModule,
    ProdutosModule,
    EstadosModule,
    CidadesModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
