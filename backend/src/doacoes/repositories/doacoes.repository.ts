import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoacaoDto } from '../dto/create-doacao.dto';
import { $Enums } from '@prisma/client';
import { DoacaoOut } from '../interfaces/doacao.out';

@Injectable()
export class DoacaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const doacoesOut: DoacaoOut[] = [];
    const doacoes = await this.prisma.doacao.findMany();
    for (const doacao of doacoes) {
      const itens_doacao = await this.prisma.itensDoacao.findMany({
        where: { doa_id: doacao.doa_id },
      });
      doacoesOut.push({ ...doacao, itens_doacao });
    }
    return doacoesOut;
  }

  async findOne(id: number) {
    const doacao = await this.prisma.doacao.findUnique({
      where: { doa_id: id },
    });
    if (doacao) {
      const itens_doacao = await this.prisma.itensDoacao.findMany({
        where: { doa_id: doacao.doa_id },
      });
      return { ...doacao, itens_doacao };
    }
    return new NotFoundException('Doacao não encontrada');
  }

  async create(createDoacaoDto: CreateDoacaoDto) {
    if (
      !createDoacaoDto.doa_dinheiro &&
      (!createDoacaoDto.itens_doacao ||
        createDoacaoDto.itens_doacao.length === 0)
    )
      throw new BadRequestException('Doacao deve conter dinheiro ou itens');
    let itensDoacao = [];
    if (createDoacaoDto.itens_doacao) {
      itensDoacao = await Promise.all(
        createDoacaoDto.itens_doacao.map(async (item) => {
          const produto = await this.prisma.produto.findFirst({
            where: { pro_id: item.pro_id },
          });
          if (!produto) throw new NotFoundException('Produto não encontrado');
          const itemData = {
            pro_id: item.pro_id,
            itens_doa_quantidade: item.itens_doa_quantidade,
            itens_doa_especificacao: item.itens_doa_especificacao,
          };
          return itemData;
        }),
      );
    }
    let doacao = null;
    if (createDoacaoDto.pes_id_doador) {
      const pessoa = await this.prisma.pessoa.findFirst({
        where: { pes_id: createDoacaoDto.pes_id_doador },
      });
      if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
      doacao = {
        doa_data: new Date(createDoacaoDto.doa_data),
        doa_dinheiro: createDoacaoDto.doa_dinheiro,
        itens_doacao: {
          create: itensDoacao,
        },
        pes_id_doador: createDoacaoDto.pes_id_doador,
      };
    } else
      doacao = {
        doa_data: new Date(createDoacaoDto.doa_data),
        doa_dinheiro: createDoacaoDto.doa_dinheiro,
        itens_doacao: {
          create: itensDoacao,
        },
      };
    const novaDoacao = this.prisma.doacao.create({
      data: doacao,
    });
    const atualizacoesEstoque = itensDoacao.map((item) => {
      const estoque =
        item.itens_doa_especificacao === $Enums.Especificacao.ONG
          ? 'pro_estoque_ong'
          : 'pro_estoque_doacoes';
      return this.prisma.produto.update({
        where: { pro_id: item.pro_id },
        data: { [estoque]: { increment: item.itens_doa_quantidade } },
      });
    });
    const result = await this.prisma.$transaction([
      novaDoacao,
      ...atualizacoesEstoque,
    ]);
    return result[0];
  }

  async remove(id: number) {
    const doacao = await this.prisma.doacao.findUnique({
      where: { doa_id: id },
    });
    if (!doacao) throw new NotFoundException('Doacao não encontrada');
    const itens = await this.prisma.itensDoacao.findMany({
      where: { doa_id: doacao.doa_id },
    });
    const atualizacoesEstoque = itens.map((item) => {
      const estoque =
        item.itens_doa_especificacao === $Enums.Especificacao.ONG
          ? 'pro_estoque_ong'
          : 'pro_estoque_doacoes';
      return this.prisma.produto.update({
        where: { pro_id: item.pro_id },
        data: { [estoque]: { decrement: item.itens_doa_quantidade } },
      });
    });
    const result = await this.prisma.$transaction([
      this.prisma.itensDoacao.deleteMany({ where: { doa_id: id } }),
      ...atualizacoesEstoque,
      this.prisma.doacao.delete({ where: { doa_id: id } }),
    ]);
    return result[result.length - 1];
  }
}
