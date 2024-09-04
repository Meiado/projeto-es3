import { FastifyInstance, FastifyPluginOptions } from "fastify";
import TipoProdutoController from "../controllers/TipoProdutoController";

export default async function tipoProdutoRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get('/', TipoProdutoController.getAll);
  fastify.post('/', TipoProdutoController.create);

}