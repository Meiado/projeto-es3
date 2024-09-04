import { FastifyInstance, FastifyPluginOptions } from "fastify";
import FisicaController from "../controllers/FisicaController";

export default async function fisicaRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  
  fastify.post('/', FisicaController.create);
  fastify.get('/', FisicaController.findAll);
  fastify.get('/:id', FisicaController.findOne);
  fastify.put('/:id', FisicaController.update);
  // fastify.put('/switch/:id', FisicaController.switch);
  fastify.delete('/:id', FisicaController.delete);
}