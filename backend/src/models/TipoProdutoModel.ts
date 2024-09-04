import { TipoProdutoIn, TipoProdutoOut } from "../dtos/TipoProdutoDTO";
import prisma from "../prisma";

export default class TipoProdutoModel {

  static async create(data: TipoProdutoIn): Promise<TipoProdutoOut> {
    const tipoProduto = await prisma.tipoProduto.create({ data });
    return tipoProduto;
  }

  static async getAll(): Promise<Array<TipoProdutoOut>> {
    const tiposProdutos = await prisma.tipoProduto.findMany();
    return tiposProdutos;
  }

  static async getById(tipo_pro_id: number): Promise<TipoProdutoOut | null> {
    const tipoProduto = await prisma.tipoProduto.findUnique({ where: { tipo_pro_id } });
    return tipoProduto;
  }

  static async findByNome(tipo_pro_nome: string): Promise<Array<TipoProdutoOut>> {
    const tiposProduto = await prisma.tipoProduto.findMany({
      where: { tipo_pro_nome: { contains: tipo_pro_nome } }
    });
    return tiposProduto;
  }
}