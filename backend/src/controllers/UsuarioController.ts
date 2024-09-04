import { FastifyRequest, FastifyReply } from "fastify";
import { usuarioBodySchema } from "../schemas/UsuarioSchema";
import { joiOptions } from "../schemas";
import PessoaModel from "../models/PessoaModel";
import { UsuarioIn } from "../dtos/UsuarioDTO";
import AppError from "../utils/AppError";
import PermissaoModel from "../models/PermissaoModel";
import StatusModel from "../models/StatusModel";
import UsuarioModel from "../models/UsuarioModel";

export default class UsuarioController {

  static async create(req: FastifyRequest<{Body: UsuarioIn}>, res: FastifyReply) {
    await usuarioBodySchema.validateAsync(req.body, joiOptions);

    const data = req.body;

    const pessoa = await PessoaModel.getById(data.pes_id);
    if (!pessoa)
      throw new AppError('Pessoa não encontrada', 404);

    const permissao = await PermissaoModel.getById(data.tp_id);
    if (!permissao)
      throw new AppError('Permissão não encontrada', 404);
      
    const status = await StatusModel.getById(data.ts_id);
    if (!status)
      throw new AppError('Status não encontrado', 404);

    await UsuarioModel.create(data);
    res.code(201).send({ message: 'Usuário cadastrado com sucesso' });
  }

}