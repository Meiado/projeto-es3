import { FastifyRequest, FastifyReply } from "fastify";
import PermissaoModel from "../models/PermissaoModel";

export default class PermissaoController {

  static async getAll(req: FastifyRequest, res: FastifyReply) : Promise<any> {
    const permissoes = await PermissaoModel.getAll();
    res.code(200).send(permissoes);
  } 

}