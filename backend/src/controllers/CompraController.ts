import { FastifyRequest, FastifyReply } from "fastify";
import { CompraBody, CompraIn } from "../dtos/CompraDTO";
import { compraBodySchema } from "../schemas/CompraSchema";
import { joiOptions } from "../schemas";
import { ItemCompraBody, ItemCompraIn } from "../dtos/ItemCompraDTO";
import ProdutoModel from "../models/ProdutoModel";
import AppError from "../utils/AppError";
import PessoaModel from "../models/PessoaModel";
import CompraModel from "../models/CompraModel";
import ItemCompraModel from "../models/ItemCompraModel";
import { ProdutoEstoqueIn } from "../dtos/ProdutoDTO";

export default class CompraController {

  private static async filterItensCompra(itensCompra: Array<ItemCompraBody>, compraId: number = 0): Promise<{ valorTotal: number, itensCompra: Array<ItemCompraIn> }> {
    let valorTotal = 0;
    const itensCompraData: Array<ItemCompraIn> = await Promise.all(
      itensCompra.map(async item => {

        // Validar se produto existe
        const produto = await ProdutoModel.getById(item.pro_id);
        if (!produto)
          throw new AppError(`Nenhum produto com ID ${item.pro_id} existe`, 400);

        const itemData: ItemCompraIn = {
          pro_id: item.pro_id,
          com_id: compraId,
          itens_com_quantidade: item.itens_com_quantidade,
          itens_com_valor: item.itens_com_valor
        };

        valorTotal += itemData.itens_com_valor * itemData.itens_com_quantidade;

        return itemData;
      })
    );

    return { valorTotal, itensCompra: itensCompraData };
  }

  static async create(req: FastifyRequest<{ Body: CompraBody }>, res: FastifyReply) {
    await compraBodySchema.validateAsync(req.body, joiOptions);

    const data = req.body;

    data.pes_id = 5;

    // Verifica se é um voluntario
    const pessoa = await PessoaModel.getById(data.pes_id);
    if (!pessoa)
      throw new AppError('Pessoa não encontrada', 400);

    let valorTotal = 0;
    const itensCompraData: Array<ItemCompraIn> = await Promise.all(
      data.itens_compra.map(async item => {

        // Validar se produto existe
        const produto = await ProdutoModel.getById(item.pro_id);
        if (!produto)
          throw new AppError(`Nenhum produto com ID ${item.pro_id} existe`, 400);

        const itemData: ItemCompraIn = {
          pro_id: item.pro_id,
          com_id: 0,
          itens_com_quantidade: item.itens_com_quantidade,
          itens_com_valor: item.itens_com_valor
        };

        valorTotal += itemData.itens_com_valor * itemData.itens_com_quantidade;

        return itemData;
      })
    );

    const compraData: CompraIn = {
      com_data_compra: new Date(data.com_data_compra),
      com_valor_total: valorTotal,
      pes_id: data.pes_id
    }

    await CompraModel.create(compraData, itensCompraData);
    res.code(201).send({ message: "Compra registrada con sucesso e estoque atualizado" });
  }

  static async getAll(req: FastifyRequest, res: FastifyReply) {
    const compras = await CompraModel.getAll();
    res.code(200).send(compras);
  }

  static async getById(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    const id = Number.parseInt(req.params.id);

    if (isNaN(id))
      throw new AppError('Parâmetro ID inválido', 400);

    const compra = await CompraModel.getById(id);

    if (!compra)
      throw new AppError('Compra não encontrada', 404);

    const compraData = {
      ...compra,
      itens_compra: compra.itens_compra.map(item => ({
        pro_id: item.produto.pro_id,
        pro_nome: item.produto.pro_nome,
        itens_com_quantidade: item.itens_com_quantidade,
        itens_com_valor: item.itens_com_valor
      }))
    }

    res.code(200).send(compraData);
  }

  static async update(req: FastifyRequest<{ Params: { id: string }, Body: CompraBody }>, res: FastifyReply) {
    await compraBodySchema.validateAsync(req.body, joiOptions);

    const id = Number(req.params.id);
    const data = req.body;

    if (isNaN(id))
      throw new AppError('Parâmetro ID inválido', 400);

    const compra = await CompraModel.getById(id);

    if (!compra)
      throw new AppError('Compra não encontrada', 404);

    try {
      const response = await CompraController.filterItensCompra(data.itens_compra, compra.com_id);

      const compraData: CompraIn = {
        com_data_compra: new Date(data.com_data_compra),
        com_valor_total: response.valorTotal,
        pes_id: data.pes_id,
      }

      const itensCompraBeforeUpdate = await ItemCompraModel.findManyByCompraId(compra.com_id);

      const itensExcluidos: number[] = [];
      const itensAdicionados: ItemCompraIn[] = [];
      const itensAtualizados: ItemCompraIn[] = [];
      itensCompraBeforeUpdate.forEach(item => {
        let index = data.itens_compra.findIndex(i => i.pro_id === item.pro_id);
        if (index === -1)
          itensExcluidos.push(item.pro_id);
      });

      data.itens_compra.forEach(item => {
        let index = itensCompraBeforeUpdate.findIndex(i => i.pro_id === item.pro_id);

        let data: ItemCompraIn = {
          pro_id: item.pro_id,
          com_id: id,
          itens_com_quantidade: item.itens_com_quantidade,
          itens_com_valor: item.itens_com_valor
        };

        if (index !== -1)
          itensAtualizados.push(data);
        else
          itensAdicionados.push(data);
      });

      // Informações de produto e quantidade para atualizar o estoque
      const itensProdutoEstoque: Array<ProdutoEstoqueIn> = data.itens_compra.map(item => {
        const itemCompra = itensCompraBeforeUpdate.find(i => i.pro_id == item.pro_id);
        let quantidade = 0;
        if (itemCompra)
          quantidade = item.itens_com_quantidade - itemCompra.itens_com_quantidade;
        return { pro_id: item.pro_id, quantidade };
      });


      await CompraModel.update(id, compraData);
      if (itensExcluidos.length > 0)
        await ItemCompraModel.removeMany(id, itensExcluidos);
      if (itensAtualizados.length > 0)
        await ItemCompraModel.updateMany(id, itensAtualizados);
      if (itensAdicionados.length > 0)
        await ItemCompraModel.createMany(itensAdicionados);

      await ProdutoModel.updateEstoqueOng(itensProdutoEstoque);

      res.status(200).send({ message: 'Compra e estoque atualizados' });

    } catch (error) {
      res.status(500).send({ message: 'Erro ao atualizar compra' });
    }
  }

  static async remove(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    const id = Number(req.params.id);

    if (isNaN(id))
      throw new AppError('Parâmetro ID inválido', 400);

    const compra = await CompraModel.getById(id);

    if (!compra)
      throw new AppError('Compra não encontrada', 404);

    try {

      const itensProdutoEstoque: Array<ProdutoEstoqueIn> = compra.itens_compra.map(item => ({
        pro_id: item.produto.pro_id,
        quantidade: -(item.itens_com_quantidade)
      }));

      ItemCompraModel.removeManyByCompraId(compra.com_id);
      CompraModel.remove(compra.com_id);
      ProdutoModel.updateEstoqueOng(itensProdutoEstoque);

      res.status(200).send({ message: 'Compra excluida com sucesso' });

    } catch (error) {
      res.status(500).send({ message: 'Erro ao excluir compra' });
    }
  }

}