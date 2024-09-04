import { PessoaData, PessoaIn, PessoaOut } from "../dtos/PessoaDTO";
import prisma from "../prisma";
import AppError from "../utils/AppError";

export default class PessoaModel {

  static async getById(pes_id: number) : Promise<PessoaOut|null> {
    const pessoa = await prisma.pessoa.findUnique({ where: { pes_id } });
    return pessoa;
  }

  static create(pessoaData: PessoaData) {
    const pessoa = prisma.pessoa.create({
      data: pessoaData
    });
    return pessoa;
  }

  static update(id: number, pessoaData: PessoaData) {
    const pessoa = prisma.pessoa.findUnique({ where: { pes_id: id } });
    if(!pessoa) {
      throw new AppError('Pessoa não encontrada', 404);
    }
    return prisma.pessoa.update({
      where: {
        pes_id: id,
      },
      data: pessoaData
    })
  }

  static async getByEmail(pes_email: string): Promise<PessoaOut|null> {
    const pessoa = await prisma.pessoa.findUnique({ where: {pes_email: pes_email} });
    return pessoa;
  }

  static delete(id: number) {
    return prisma.pessoa.delete({ where: { pes_id: id } });
}

}