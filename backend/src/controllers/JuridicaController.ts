import { FastifyRequest, FastifyReply } from "fastify";
import { JuridicaIn, JuridicaOut, JuridicaUpdate, PessoaJuridicaIn } from "../dtos/JuridicaDTO";
import { juridicaBodySchema } from "../schemas/JuridicaSchema";
import { joiOptions } from "../schemas";
import AppError from "../utils/AppError";
import CidadeModel from "../models/CidadeModel";
import { PessoaIn, PessoaOut } from "../dtos/PessoaDTO";
import JuridicaModel from "../models/JuridicaModel";
import { PrismaClient } from "@prisma/client";
import PessoaModel from "../models/PessoaModel";

const prisma = new PrismaClient();

export default class JuridicaController {

  static async findAll(req: FastifyRequest, res: FastifyReply) {
    const pessoasJuridicas = await JuridicaModel.getAll();
    res.send(pessoasJuridicas);
  }

  static async findOne(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const pessoaJuridica: JuridicaOut = await JuridicaModel.getById(id);
    res.send(pessoaJuridica);
  }

  static async create(req: FastifyRequest<{ Body: PessoaJuridicaIn }>, res: FastifyReply) {
    await juridicaBodySchema.validateAsync(req.body, joiOptions);
  
    const data = req.body;
  
    const cidade = await CidadeModel.getById(data.cid_id);
    if (!cidade)
      throw new AppError('Cidade não encontrada', 404);
    
    const pessoaData: PessoaIn = {
      pes_nome: data.pes_nome,
      pes_email: data.pes_email,
      pes_telefone: data.pes_telefone,
      pes_logradouro: data.pes_logradouro,
      pes_complemento: data.pes_complemento,
      pes_numero: data.pes_numero,
      pes_bairro: data.pes_bairro,
      cid_id: data.cid_id,
      pes_status: data.pes_status
    };
  
    const juridicaData: JuridicaIn = {
      pes_id: 0,
      jur_cnpj: data.jur_cnpj,
      jur_razao_social: data.jur_razao_social,
      jur_url_site: data.jur_url_site,
      jur_nome_fantasia: data.jur_nome_fantasia
    };

    const criarPessoaJuridica = prisma.pessoa.create({
      data: {
        ...pessoaData,
        juridica: {
          create : {
            ...juridicaData
          }
        }
      },
      include: {
        juridica: true,
      },
    }); 

    const result = await prisma.$transaction([criarPessoaJuridica]);
    res.send(result);
  }

  static async update(req: FastifyRequest<{ Params: { id: number }, Body: PessoaJuridicaIn }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const data = req.body;

    const cidade = await CidadeModel.getById(data.cid_id);
    if(!cidade) {
      throw new AppError('Cidade não encontrada', 404);
    }

    const pessoaData: PessoaIn = {
      pes_nome: data.pes_nome,
      pes_email: data.pes_email,
      pes_telefone: data.pes_telefone,
      pes_logradouro: data.pes_logradouro,
      pes_complemento: data.pes_complemento,
      pes_numero: data.pes_numero,
      pes_bairro: data.pes_bairro,
      cid_id: data.cid_id,
      pes_status: data.pes_status
    };

    const juridicaData: JuridicaUpdate = {
      jur_cnpj: data.jur_cnpj,
      jur_razao_social: data.jur_razao_social,
      jur_url_site: data.jur_url_site,
      jur_nome_fantasia: data.jur_nome_fantasia
    };

    const result = await prisma.$transaction([PessoaModel.update(id, pessoaData), JuridicaModel.update(id, juridicaData)]);
    res.send(result);
  }

  static async delete(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const result = await prisma.$transaction([JuridicaModel.delete(id), PessoaModel.delete(id)]);
    res.send(result);
  }
}