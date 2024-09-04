import { ProdutoEstoqueIn, ProdutoIn, ProdutoOut } from "../dtos/ProdutoDTO";
import prisma from "../prisma";

export default class ProdutoModel {

  static async create(data: ProdutoIn): Promise<ProdutoOut> {
    const produto: ProdutoOut = await prisma.produto.create({ data });
    return produto;
  }

  static async getAll(): Promise<Array<ProdutoOut>> {
    const produtos = await prisma.produto.findMany();
    return produtos;
  }

  static async getById(pro_id: number): Promise<ProdutoOut | null> {
    const produto = await prisma.produto.findUnique({ where: { pro_id } });
    return produto;
  }

  static async updateEstoqueOng(data: Array<ProdutoEstoqueIn>) {
    const produtos = await Promise.all(
      data.map(async item => {
        const produto = await prisma.produto.findUnique({ where: { pro_id: item.pro_id } });
        if (produto) {
          const produtoUpdated = await prisma.produto.update({ where: { pro_id: item.pro_id }, data: { pro_estoque_ong: produto.pro_estoque_ong + item.quantidade } });
          return produtoUpdated;
        }
      })
    );
    return produtos;
  }

}