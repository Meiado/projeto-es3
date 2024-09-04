import { ItemCompraIn } from "../dtos/ItemCompraDTO";
import prisma from "../prisma";

export default class ItemCompraModel {

  static async createMany(data: ItemCompraIn[]) {
    const itemsCompra = await prisma.itensCompra.createMany({ data });
    return itemsCompra;
  }

  static async updateMany(compraId: number, data: Array<ItemCompraIn>) {
    const itensCompra = await Promise.all(
      data.map(async item => (
        await prisma.itensCompra.update({
          where: { pro_id_com_id: { com_id: compraId, pro_id: item.pro_id } },
          data: item
        })
      ))
    );
    return itensCompra;
  }

  static async findManyByCompraId(compraId: number) {
    const itensCompra = await prisma.itensCompra.findMany({ where: { com_id: compraId } });
    return itensCompra;
  }

  static async removeMany(compraId: number, ids: number[]) {
    return await prisma.itensCompra.deleteMany({
      where: { com_id: compraId, pro_id: { in: ids } },
    });
  }

  static async removeManyByCompraId(compraId: number) {
    return await prisma.itensCompra.deleteMany({
      where: { com_id: compraId }
    });
  }

}