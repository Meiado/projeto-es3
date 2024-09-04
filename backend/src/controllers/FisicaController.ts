import { FastifyRequest, FastifyReply } from "fastify";
import FisicaModel from "../models/FisicaModel";
import { fisicaBodySchema } from "../schemas/FisicaSchema";
import { joiOptions } from "../schemas";
import CidadeModel from "../models/CidadeModel";
import { PessoaData, PessoaIn, PessoaOut } from "../dtos/PessoaDTO";
import AppError from "../utils/AppError";
import SexoModel from "../models/SexoModel";
import { FisicaIn, FisicaOut, FisicaUpdate, PessoaFisica, PessoaFisicaIn, PessoaFisicaOut } from "../dtos/FisicaDTO";
import PessoaModel from "../models/PessoaModel";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma";
import EstadoModel from "../models/EstadoModel";


export default class FisicaController {
  
  // static async switch(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
  //   const id = Number(req.params.id);
  //   const fisica = await FisicaModel.getById(id);
  //   if(fisica) {
  //     const pessoa = await PessoaModel.getById(id);
  //     if (pessoa) {
  //       pessoa.pes_status = !pessoa.pes_status;
  //       await PessoaModel.update(id, pessoa);
  //       res.status(200).send('Status alterado');
  //     }
  //   }
  //   res.status(400).send('Não corresponde a uma pessoa física');
  // }

  static async findAll(req: FastifyRequest, res: FastifyReply) {
    const pessoasFisicas = await FisicaModel.getAll();
    let pessoasOut: PessoaFisicaOut[] = [];
    for(const pessoaFisica of pessoasFisicas) {
      const pessoa = await PessoaModel.getById(pessoaFisica.pes_id);
      if(pessoa) {
        const cidade = await CidadeModel.getById(pessoa.cid_id);
        if(!cidade)
          throw new AppError('Cidade invalida',400);
        const estado = await EstadoModel.getById(cidade.est_id);
        if(!estado)
          throw new AppError('Estado inválido', 400);
        const pessoaOut: PessoaFisicaOut = {
          pes_id: pessoa.pes_id,
          fis_cpf: pessoaFisica.fis_cpf,
          fis_rg: pessoaFisica.fis_rg,
          sex_id: pessoaFisica.sex_id,
          fis_data_nascimento: new Date(pessoaFisica.fis_data_nascimento),
          pes_nome: pessoa.pes_nome,
          pes_email: pessoa.pes_email,
          pes_telefone: pessoa.pes_telefone,
          pes_logradouro: pessoa.pes_logradouro,
          pes_complemento: pessoa.pes_complemento,
          pes_numero: pessoa.pes_numero,
          pes_bairro: pessoa.pes_bairro,
          cid_nome: cidade.cid_nome,
          est_sigla: estado.est_uf,
          pes_status: pessoa.pes_status
        }
        pessoasOut.push(pessoaOut);
      }
    };
    res.send(pessoasOut);
  }

  static async findOne(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const pessoaFisica = await FisicaModel.getById(id);
    if(!pessoaFisica) {
      throw new AppError('Pessoa física não encontrada', 404);
    }
    const pessoa = await PessoaModel.getById(pessoaFisica.pes_id);
    if(!pessoa) {
      throw new AppError('Pessoa física não encontrada', 404);
    }
    const cidade = await CidadeModel.getById(pessoa.cid_id);
    if(!cidade)
      throw new AppError('Cidade invalida',400);

    const estado = await EstadoModel.getById(cidade.est_id);
    if(!estado)
      throw new AppError('Estado inválido', 400);
    
    const pessoaOut: PessoaFisicaOut = {
      pes_id: pessoa.pes_id,
      fis_cpf: pessoaFisica.fis_cpf,
      fis_rg: pessoaFisica.fis_rg,
      sex_id: pessoaFisica.sex_id,
      fis_data_nascimento: new Date(pessoaFisica.fis_data_nascimento),
      pes_nome: pessoa.pes_nome,
      pes_email: pessoa.pes_email,
      pes_telefone: pessoa.pes_telefone,
      pes_logradouro: pessoa.pes_logradouro,
      pes_complemento: pessoa.pes_complemento,
      pes_numero: pessoa.pes_numero,
      pes_bairro: pessoa.pes_bairro,
      cid_nome: cidade.cid_nome,
      est_sigla: estado.est_uf,
      pes_status: pessoa.pes_status
    }
    res.send(pessoaOut);
  }

  static async create(req: FastifyRequest<{ Body: PessoaFisicaIn }>, res: FastifyReply) {
    await fisicaBodySchema.validateAsync(req.body, joiOptions);

    const data = req.body;
  
    const estado = await EstadoModel.getBySigla(data.est_sigla);
    if(!estado) 
      throw new AppError('Estado inválido.', 400);
    
    const cidades = await CidadeModel.getByEstado(estado.est_id);
    let cidade = cidades.find(c  => c.cid_nome.toLowerCase() === data.cid_nome.toLowerCase());
    if(!cidade) 
      cidade = await CidadeModel.create(data.cid_nome, estado.est_id);
      
    const sexo = await SexoModel.getById(data.sex_id);
    if (!sexo)
      throw new AppError('Sexo não encontrado', 404);

    const pessoaData: PessoaData = {
      pes_nome: data.pes_nome, 
      pes_email: data.pes_email,
      pes_telefone: data.pes_telefone,
      pes_logradouro: data.pes_logradouro,
      pes_complemento: data.pes_complemento,
      pes_numero: data.pes_numero,
      pes_bairro: data.pes_bairro,
      cid_id: cidade.cid_id,
      pes_status: data.pes_status
    };

    const fisicaData: FisicaIn = {
      fis_cpf: data.fis_cpf,
      fis_rg: data.fis_rg,
      sex_id: data.sex_id,
      fis_data_nascimento: new Date(data.fis_data_nascimento)
    };

    const criarPessoaFisica = prisma.pessoa.create({
      data: {
        ...pessoaData,
        fisica: {
          create : {
            ...fisicaData
          }
        }
      },
      include: {
        fisica: true,
      },
    }); 

    const result = await prisma.$transaction([criarPessoaFisica]);
    res.send(result);
  }


  static async update(req: FastifyRequest<{ Params: { id: number }, Body: PessoaFisicaIn }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const data = req.body;
  
    const estado = await EstadoModel.getBySigla(data.est_sigla);
    if(!estado) 
      throw new AppError('Estado inválido.', 400);
    
    const cidades = await CidadeModel.getByEstado(estado.est_id);
    let cidade = cidades.find(c  => c.cid_nome.toLowerCase() === data.cid_nome.toLowerCase());
    if(!cidade) 
      cidade = await CidadeModel.create(data.cid_nome, estado.est_id);
      
    const sexo = await SexoModel.getById(data.sex_id);
    if(!sexo)
      throw new AppError('Sexo não encontrado', 404);
  
    const pessoaData: PessoaData = {
      pes_nome: data.pes_nome,
      pes_email: data.pes_email,
      pes_telefone: data.pes_telefone,
      pes_logradouro: data.pes_logradouro,
      pes_bairro: data.pes_bairro,
      pes_complemento: data.pes_complemento,
      pes_numero: data.pes_numero,
      cid_id: cidade.cid_id,
      pes_status: data.pes_status
    };
  
    const fisicaData: FisicaUpdate = {
      fis_cpf: data.fis_cpf,
      fis_rg: data.fis_rg,
      sex_id: data.sex_id,
      fis_data_nascimento: new Date(data.fis_data_nascimento)
    }
  
    const result = await prisma.$transaction([PessoaModel.update(id, pessoaData), FisicaModel.update(id, fisicaData)]);
    res.send(result);
  }
  

  static async delete(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const result = await prisma.$transaction([FisicaModel.delete(id), PessoaModel.delete(id)]);
    res.send(result);
  }
  
}