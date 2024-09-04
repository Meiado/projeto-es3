import prisma from "../prisma";
import { FisicaIn, FisicaOut, FisicaUpdate, PessoaFisica } from "../dtos/FisicaDTO";
import { PessoaIn, PessoaOut } from "../dtos/PessoaDTO";
import AppError from "../utils/AppError";
import PessoaModel from "./PessoaModel";

export default class FisicaModel {
  static async getAll() {
    const pessoasFisicas: FisicaOut[] = await prisma.fisica.findMany();
    return pessoasFisicas;
  }

  static async getById(id: number) {
    const pessoaFisica = await prisma.fisica.findUnique({ where: { pes_id: id } });
    return pessoaFisica;
  }
  
  static create(fisicaData: FisicaIn, id: number) {
    const fisica = prisma.fisica.create({
      data: {
        pes_id: id,
        ...fisicaData,
      }
    });
    return fisica;
  }

  static update(id: number, fisicaData: FisicaUpdate) {
    return prisma.fisica.update({
      where: { 
        pes_id: id,
      },
      data: fisicaData,
    });
  }

  static delete(id: number) {
    return prisma.fisica.delete({ where: { pes_id: id } });
  }
  
};