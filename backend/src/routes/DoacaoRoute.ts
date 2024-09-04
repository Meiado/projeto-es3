import { FastifyInstance, FastifyPluginOptions } from "fastify";
import DoacaoController from "../controllers/DoacaoController";

export default async function doacaoRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.post('/', DoacaoController.create);
  fastify.get('/', DoacaoController.getAll);
  fastify.get('/:id', DoacaoController.getById);
  fastify.delete('/:id', DoacaoController.delete);

}