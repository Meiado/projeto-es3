import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CompraController from "../controllers/CompraController";

export default async function compraRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.post('/', CompraController.create);
  fastify.get('/', CompraController.getAll);
  fastify.get('/:id', CompraController.getById);
  fastify.put('/:id', CompraController.update);
  fastify.delete('/:id', CompraController.remove);

}