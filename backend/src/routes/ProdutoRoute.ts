import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ProdutoController from "../controllers/ProdutoController";

export default async function produtoRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get('/', ProdutoController.getAll);
  fastify.post('/', ProdutoController.create);

}