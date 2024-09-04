import { FastifyRequest, FastifyReply } from "fastify";
import { ProdutoIn } from "../dtos/ProdutoDTO";
import { produtoBodySchema } from "../schemas/ProdutoSchema";
import { joiOptions } from "../schemas";
import ProdutoModel from "../models/ProdutoModel";
import TipoProdutoModel from "../models/TipoProdutoModel";
import AppError from "../utils/AppError";

export default class ProdutoController {

  static async create(req: FastifyRequest<{ Body: ProdutoIn }>, res: FastifyReply) {
    await produtoBodySchema.validateAsync(req.body, joiOptions);

    const data = req.body;

    const tipoProduto = await TipoProdutoModel.getById(data.tipo_pro_id);
    if (!tipoProduto)
      throw new AppError('Tipo de produto não encontrado', 404);

    const produtoData: ProdutoIn = {
      pro_nome: data.pro_nome,
      pro_descricao: data.pro_descricao,
      pro_estoque_doacoes: 0,
      pro_estoque_ong: 0,
      tipo_pro_id: data.tipo_pro_id
    };

    await ProdutoModel.create(produtoData);
    res.code(201).send({ message: 'Produto cadastrado com sucesso' });
  }

  static async getAll(req: FastifyRequest, res: FastifyReply) {
    const produtos = await ProdutoModel.getAll();
    return produtos;
  }

}