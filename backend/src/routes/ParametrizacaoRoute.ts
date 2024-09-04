import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ParametrizacaoController from "../controllers/ParametrizacaoController";

export default async function parametrizacaoRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.post('/', ParametrizacaoController.save);
  fastify.get('/', ParametrizacaoController.get);

}