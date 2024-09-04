import prisma from "../prisma";

export default class CidadeModel {

  static async getAll() {
    const cidades = await prisma.cidade.findMany();
    return cidades;
  }

  static async getById(id : number) {
    const cidade = await prisma.cidade.findUnique({ where: { cid_id: id } });
    return cidade;
  }

  static async getByNome(nome: string) {
    const cidade = await prisma.cidade.findUnique({ where: { cid_nome: nome } });
    return cidade;
  }

  static async getByEstado(id: number) {
    const cidades = await prisma.cidade.findMany({ where: { est_id: id } });
    return cidades;
  }

  static async create(cid_nome: string, est_id: number) {
    return await prisma.cidade.create({ data: { cid_nome, est_id } });
  }

}