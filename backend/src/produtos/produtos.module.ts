import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { ProdutosRepository } from './repositories/produtos.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, ProdutosRepository, PrismaService],
})
export class ProdutosModule {}
