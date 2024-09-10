import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EstadosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.estado.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.estado.findUnique({ where: { est_id: id } });
  }

  async findBySigla(sigla: string) {
    return await this.prisma.estado.findUnique({ where: { est_uf: sigla } });
  }
}
