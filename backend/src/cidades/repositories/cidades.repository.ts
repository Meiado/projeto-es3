import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CidadesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const cidades = await this.prisma.cidade.findMany();
    return cidades;
  }

  async findOne(id: number) {
    const cidade = await this.prisma.cidade.findFirst({
      where: { cid_id: id },
    });
    return cidade;
  }

  async findByEstado(id: number) {
    const cidades = await this.prisma.cidade.findMany({
      where: { est_id: id },
    });
    return cidades;
  }
}
