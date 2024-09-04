import prisma from "../prisma";

export default class SexoModel {

  static async getById(id: number) {
    const sexo = await prisma.sexo.findUnique({ where: { sex_id: id } });
    return sexo;
  }

}