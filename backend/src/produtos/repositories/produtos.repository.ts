import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const produtos = await this.prisma.produto.findMany();
    return produtos;
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findFirst({
      where: { pro_id: id },
    });
    return produto;
  }
}
