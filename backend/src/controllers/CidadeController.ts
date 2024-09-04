import { FastifyRequest, FastifyReply } from "fastify";
import CidadeModel from "../models/CidadeModel";
import EstadoModel from "../models/EstadoModel";

export default class CidadeController {
  static async getById(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const cidade = await CidadeModel.getById(id);
    if(cidade)
      res.code(200).send(cidade);
    res.code(404).send('Cidade não encontrada')
  }
  static async getByEstado(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
    const id = Number(req.params.id);
    const estado = await EstadoModel.getById(id);
    if(estado) {
      const cidades = await CidadeModel.getByEstado(estado.est_id);
      res.code(200).send(cidades);
    }
    res.code(404).send('Estado não encontrado');
  }

  static async getAll(req: FastifyRequest, res: FastifyReply) {
    const cidades = await CidadeModel.getAll();
    res.code(200).send(cidades);
  }

}