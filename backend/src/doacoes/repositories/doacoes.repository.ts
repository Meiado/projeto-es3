import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoacaoDto } from '../dto/create-doacao.dto';
import { $Enums } from '@prisma/client';
import { Subject } from 'src/utils/interfaces/Subject';
import { Observer } from 'src/utils/interfaces/Observer';
import { DoadorObserver } from 'src/pessoas/observer/doador.observer';
import { DoacaoOut } from '../dto/out-doacao.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class DoacaoRepository implements Subject {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {
    this.loadObservers();
  }
  private observers: Observer[] = [];

  async loadObservers() {
    const doadores = [];
    const doacoes = await this.prisma.doacao.findMany();
    for (const doacao of doacoes) {
      const doador = await this.prisma.pessoa.findUnique({
        where: { pes_id: doacao.pes_id_doador },
      });
      if (doador) doadores.push(doador);
    }
    for (const doador of doadores) {
      if (doador.pes_status) {
        const doadorObserver = new DoadorObserver(
          this.mailerService,
          doador.pes_id,
          doador.pes_email,
        );
        this.registerObserver(doadorObserver);
      }
    }
  }
  registerObserver(o: Observer): void {
    this.observers.push(o);
  }
  removeObserver(o: Observer): void {
    this.observers.splice(this.observers.indexOf(o), 1);
  }
  notifyObservers(eventType: string, data: any): void {
    this.observers.forEach((observer) => {
      observer.notify(eventType, data);
    });
  }

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
    let pessoa = null;
    if (createDoacaoDto.pes_id_doador) {
      pessoa = await this.prisma.pessoa.findFirst({
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
    if (pessoa) {
      const doadorObserver = new DoadorObserver(
        this.mailerService,
        pessoa.pes_id,
        pessoa.pes_email,
      );
      this.registerObserver(doadorObserver);
      this.notifyObservers('DOACAO_RECEBIDA', result[0]);
    }
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
    this.notifyObservers('DOACAO_CANCELADA', result[result.length - 1]);
    for (const observer of this.observers) {
      if (
        observer instanceof DoadorObserver &&
        observer.pes_id === doacao.pes_id_doador
      ) {
        this.removeObserver(observer);
        break;
      }
    }
    return result[result.length - 1];
  }
}
