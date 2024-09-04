import prisma from "../prisma";

export default class EstadoModel {

  static async getById(id: number) {
    const estado = await prisma.estado.findUnique({ where: { est_id: id } });
    return estado;
  }

  static async getBySigla(est_uf: string) {
    return await prisma.estado.findUnique({ where: { est_uf } });
  }
  
  static async getAll() {
    const estados = await prisma.estado.findMany();
    return estados;
  }

}