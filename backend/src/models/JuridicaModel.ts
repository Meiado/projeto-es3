import { JuridicaIn, JuridicaOut, JuridicaUpdate } from "../dtos/JuridicaDTO";
import { PessoaIn, PessoaOut } from "../dtos/PessoaDTO";
import prisma from "../prisma";
import AppError from "../utils/AppError";

export default class JuridicaModel {
  static async getAll() {
    return await prisma.juridica.findMany();
  }

  static async getById(id: number) {
    const pessoaJuridica = await prisma.juridica.findUnique({ where: { pes_id: id } });
    if(!pessoaJuridica) {
      throw new AppError('Pessoa jurídica não encontrada', 404);
    }
    return pessoaJuridica;
  }

  static async create(juridicaData: JuridicaIn): Promise<JuridicaOut> {
      const pessoaJuridica: JuridicaOut = await prisma.juridica.create({data: juridicaData});
      return pessoaJuridica;
  }

  static update(id: number, juridicaData: JuridicaUpdate) {
    
    const juridica = prisma.juridica.findUnique({ where: { pes_id: id } });
    if(!juridica) {
      throw new AppError('Pessoa não encontrada', 404);
    }
    return prisma.juridica.update({
      where: {
        pes_id: id,
      },
      data: juridicaData,
    });
  }

  static delete(id: number) {
      return prisma.juridica.delete({ where: { pes_id: id } });
  }

};