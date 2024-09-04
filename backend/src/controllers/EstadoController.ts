import { FastifyRequest, FastifyReply } from "fastify";
import EstadoModel from "../models/EstadoModel";

export default class EstadoController {

  static async getAll(req: FastifyRequest, res: FastifyReply) {
    const estados = await EstadoModel.getAll();
    res.code(200).send(estados);
  }

  static async getById(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const estado = await EstadoModel.getById(id);
    if(estado)
      res.code(200).send(estado);
    res.code(404).send('Estado não encontrado');
  }

}