import { FastifyRequest, FastifyReply } from "fastify";
import { ParametrizacaoIn } from "../dtos/ParametrizacaoDTO";
import { parametrizacaoBodySchema } from "../schemas/ParametrizacaoSchema";
import { joiOptions } from "../schemas";
import ParametrizacaoModel from "../models/ParametrizacaoModel";
import AppError from "../utils/AppError";

export default class ParametrizacaoController {

  static async save(req: FastifyRequest<{ Body: ParametrizacaoIn }>, res: FastifyReply) {
    await parametrizacaoBodySchema.validateAsync(req.body, joiOptions);
    const data = req.body;
    await ParametrizacaoModel.save(data);
    res.code(200).send({ message: 'Parametrização salva com sucesso' });
  }

  static async get(req: FastifyRequest, res: FastifyReply) {
    const parametrizacao = await ParametrizacaoModel.get();

    if (!parametrizacao)
      throw new AppError('Parametrização não definida', 404);

    res.code(200).send(parametrizacao);
  }

}