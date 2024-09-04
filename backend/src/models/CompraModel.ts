import { CompraIn, CompraItensOut, CompraOut } from "../dtos/CompraDTO";
import { ItemCompraIn, ItemCompraOut } from "../dtos/ItemCompraDTO";
import prisma from "../prisma";

export default class CompraModel {

  static async create(compraData: CompraIn, itensData: Array<ItemCompraIn>): Promise<CompraOut> {
    return await prisma.$transaction(async (tx) => {
      // Cria a compra 
      const compra: CompraOut = await tx.compra.create({ data: compraData });

      // Define o ID da compra e grava
      for (let i = 0; i < itensData.length; i++)
        itensData[i].com_id = compra.com_id;

      // Registrando itens da compra
      await tx.itensCompra.createMany({ data: itensData });

      // Atualizando estoque
      await Promise.all(
        itensData.map(async (item) => {
          const produto = await tx.produto.findUnique({ where: { pro_id: item.pro_id } });
          if (produto) {
            const qtd = produto.pro_estoque_ong + item.itens_com_quantidade;
            await tx.produto.update({ data: { pro_estoque_ong: qtd }, where: { pro_id: produto.pro_id } });
          }
        })
      );

      return compra;
    });
  }

  static async getAll(): Promise<Array<CompraOut>> {
    const compras = await prisma.compra.findMany();
    return compras;
  }

  static async getById(com_id: number): Promise<CompraItensOut | null> {
    const compra = await prisma.compra.findUnique({
      where: { com_id },
      include: {
        itens_compra: {
          include: { produto: true }
        }
      }
    });
    return compra;
  }

  static async update(id: number, data: CompraIn) {
    const compra = await prisma.compra.update({ where: { com_id: id }, data });
    return compra;
  }

  static async remove(id: number) {
    return await prisma.compra.delete({ where: { com_id: id } });
  }

}