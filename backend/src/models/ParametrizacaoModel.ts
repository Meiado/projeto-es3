import { ParametrizacaoIn, ParametrizacaoOut } from "../dtos/ParametrizacaoDTO";
import prisma from "../prisma";

export default class ParametrizacaoModel {

  static async save(data: ParametrizacaoIn): Promise<ParametrizacaoOut> {
    let parametrizacao = await prisma.parametrizacao.findFirst();

    if (!parametrizacao)
      return await prisma.parametrizacao.create({ data });

    return await prisma.parametrizacao.update({ data, where: { par_id: parametrizacao.par_id } });
  }

  static async get(): Promise<ParametrizacaoOut | null> {
    const parametrizacao = await prisma.parametrizacao.findFirst();
    return parametrizacao;
  }

}