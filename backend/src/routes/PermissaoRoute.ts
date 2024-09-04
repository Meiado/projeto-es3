import { FastifyInstance, FastifyPluginOptions } from "fastify";
import PermissaoController from "../controllers/PermissaoController";

export default async function permissaoRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  
  fastify.get('/', PermissaoController.getAll);

}