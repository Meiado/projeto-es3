import { FastifyRequest, FastifyReply } from "fastify";
import { TipoProdutoIn } from "../dtos/TipoProdutoDTO";
import { tipoProdutoBodySchema } from "../schemas/TipoProdutoSchema";
import { joiOptions } from "../schemas";
import TipoProdutoModel from "../models/TipoProdutoModel";
import AppError from "../utils/AppError";

export default class TipoProdutoController {

  static async create(req: FastifyRequest<{ Body: TipoProdutoIn }>, res: FastifyReply) {
    await tipoProdutoBodySchema.validateAsync(req.body, joiOptions);

    const data = req.body;

    // Validação para ver se o tipo do produto ja está cadastrado 
    const tiposProdutos = await TipoProdutoModel.findByNome(data.tipo_pro_nome);
    if (tiposProdutos.length > 0)
      throw new AppError('Tipo de produto já cadastrado', 409);

    await TipoProdutoModel.create(data);
    res.code(201).send({ message: 'Tipo de produto cadastrado com sucesso' });
  }

  static async getAll(req: FastifyRequest, res: FastifyReply) {
    const tiposProdutos = await TipoProdutoModel.getAll();
    return tiposProdutos;
  }
}