import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FisicaOut } from '../interfaces/fisica.out';
import { CreateFisicaDto } from '../dto/create-fisica.dto';
import { UpdateFisicaDto } from '../dto/update-fisica.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class FisicaRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async findAll() {
    const fisicas = await this.prisma.fisica.findMany();
    const fisicasOut: FisicaOut[] = [];
    for (const fisica of fisicas) {
      const pessoa = await this.prisma.pessoa.findUnique({
        where: { pes_id: fisica.pes_id },
      });
      if (pessoa) {
        const cidade = await this.prisma.cidade.findUnique({
          where: { cid_id: pessoa.cid_id },
        });
        if (!cidade) throw new NotFoundException('Cidade não encontrada');
        const estado = await this.prisma.estado.findUnique({
          where: { est_id: cidade.est_id },
        });
        if (!estado) throw new NotFoundException('Estado não encontrado');
        const fisicaOut: FisicaOut = {
          pes_id: pessoa.pes_id,
          pes_nome: pessoa.pes_nome,
          pes_email: pessoa.pes_email,
          pes_telefone: pessoa.pes_telefone,
          pes_logradouro: pessoa.pes_logradouro,
          pes_numero: pessoa.pes_numero,
          pes_complemento: pessoa.pes_complemento,
          pes_bairro: pessoa.pes_bairro,
          est_sigla: estado.est_uf,
          cid_nome: cidade.cid_nome,
          pes_status: pessoa.pes_status,
          fis_cpf: fisica.fis_cpf,
          fis_rg: fisica.fis_rg,
          sex_id: fisica.sex_id,
          fis_data_nascimento: fisica.fis_data_nascimento,
        };
        fisicasOut.push(fisicaOut);
      }
    }
    return fisicasOut;
  }

  async findOne(id: number) {
    const fisica = await this.prisma.fisica.findUnique({
      where: { pes_id: id },
    });
    if (!fisica) throw new NotFoundException('Fisica não encontrada');
    const pessoa = await this.prisma.pessoa.findUnique({
      where: { pes_id: fisica.pes_id },
    });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
    const cidade = await this.prisma.cidade.findUnique({
      where: { cid_id: pessoa.cid_id },
    });
    if (!cidade) throw new NotFoundException('Cidade não encontrada');
    const estado = await this.prisma.estado.findUnique({
      where: { est_id: cidade.est_id },
    });
    if (!estado) throw new NotFoundException('Estado não encontrado');
    const fisicaOut: FisicaOut = {
      pes_id: pessoa.pes_id,
      pes_nome: pessoa.pes_nome,
      pes_email: pessoa.pes_email,
      pes_telefone: pessoa.pes_telefone,
      pes_logradouro: pessoa.pes_logradouro,
      pes_numero: pessoa.pes_numero,
      pes_complemento: pessoa.pes_complemento,
      pes_bairro: pessoa.pes_bairro,
      est_sigla: estado.est_uf,
      cid_nome: cidade.cid_nome,
      pes_status: pessoa.pes_status,
      fis_cpf: fisica.fis_cpf,
      fis_rg: fisica.fis_rg,
      sex_id: fisica.sex_id,
      fis_data_nascimento: fisica.fis_data_nascimento,
    };
    return fisicaOut;
  }

  async create(createFisicaDto: CreateFisicaDto) {
    const estado = await this.prisma.estado.findFirst({
      where: { est_uf: createFisicaDto.est_sigla },
    });
    if (!estado) throw new NotFoundException('Estado não encontrado');
    const cidades = await this.prisma.cidade.findMany({
      where: { est_id: estado.est_id },
    });
    let cidade = cidades.find((c) => c.cid_nome === createFisicaDto.cid_nome);
    if (!cidade)
      cidade = await this.prisma.cidade.create({
        data: {
          cid_nome: createFisicaDto.cid_nome,
          est_id: estado.est_id,
        },
      });
    const sexo = await this.prisma.sexo.findFirst({
      where: { sex_id: createFisicaDto.sex_id },
    });
    if (!sexo) throw new NotFoundException('Sexo não encontrado');
    const pessoaData = {
      pes_nome: createFisicaDto.pes_nome,
      pes_email: createFisicaDto.pes_email,
      pes_telefone: createFisicaDto.pes_telefone,
      pes_logradouro: createFisicaDto.pes_logradouro,
      pes_complemento: createFisicaDto.pes_complemento,
      pes_numero: createFisicaDto.pes_numero,
      pes_bairro: createFisicaDto.pes_bairro,
      cid_id: cidade.cid_id,
      pes_status: createFisicaDto.pes_status,
    };

    const fisicaData = {
      fis_cpf: createFisicaDto.fis_cpf,
      fis_rg: createFisicaDto.fis_rg,
      sex_id: createFisicaDto.sex_id,
      fis_data_nascimento: new Date(createFisicaDto.fis_data_nascimento),
    };

    const criarPessoaFisica = this.prisma.pessoa.create({
      data: {
        ...pessoaData,
        fisica: {
          create: {
            ...fisicaData,
          },
        },
      },
      include: {
        fisica: true,
      },
    });

    const result = await this.prisma.$transaction([criarPessoaFisica]);
    this.emailService.addObservers(result[0].pes_email);
    return result;
  }

  async update(id: number, updateFisicaDto: UpdateFisicaDto) {
    const fisica = await this.prisma.fisica.findUnique({
      where: { pes_id: id },
    });
    if (!fisica) throw new NotFoundException('Fisica não encontrada');
    const estado = await this.prisma.estado.findFirst({
      where: { est_uf: updateFisicaDto.est_sigla },
    });
    if (!estado) return new NotFoundException('Estado não encontrado');
    const cidades = await this.prisma.cidade.findMany({
      where: { est_id: estado.est_id },
    });
    let cidade = cidades.find((c) => c.cid_nome === updateFisicaDto.cid_nome);
    if (!cidade)
      cidade = await this.prisma.cidade.create({
        data: {
          cid_nome: updateFisicaDto.cid_nome,
          est_id: estado.est_id,
        },
      });
    const sexo = await this.prisma.sexo.findFirst({
      where: { sex_id: updateFisicaDto.sex_id },
    });
    if (!sexo) throw new NotFoundException('Sexo não encontrado');
    const pessoaData = {
      pes_nome: updateFisicaDto.pes_nome,
      pes_email: updateFisicaDto.pes_email,
      pes_telefone: updateFisicaDto.pes_telefone,
      pes_logradouro: updateFisicaDto.pes_logradouro,
      pes_complemento: updateFisicaDto.pes_complemento,
      pes_numero: updateFisicaDto.pes_numero,
      pes_bairro: updateFisicaDto.pes_bairro,
      cid_id: cidade.cid_id,
      pes_status: updateFisicaDto.pes_status,
    };
    const fisicaData = {
      fis_cpf: updateFisicaDto.fis_cpf,
      fis_rg: updateFisicaDto.fis_rg,
      sex_id: updateFisicaDto.sex_id,
      fis_data_nascimento: new Date(updateFisicaDto.fis_data_nascimento),
    };
    const updateFisica = this.prisma.fisica.update({
      where: { pes_id: id },
      data: {
        ...fisicaData,
      },
    });
    const updatePessoa = this.prisma.pessoa.update({
      where: { pes_id: id },
      data: {
        ...pessoaData,
      },
    });
    const result = await this.prisma.$transaction([updateFisica, updatePessoa]);
    return result;
  }

  async remove(id: number) {
    const fisica = await this.prisma.fisica.findUnique({
      where: { pes_id: id },
    });
    if (!fisica) throw new NotFoundException('Fisica não encontrada');
    const deleteFisica = this.prisma.fisica.delete({
      where: { pes_id: id },
    });
    const deletePessoa = this.prisma.pessoa.delete({
      where: { pes_id: id },
    });
    const result = await this.prisma.$transaction([deleteFisica, deletePessoa]);
    return result;
  }
}
