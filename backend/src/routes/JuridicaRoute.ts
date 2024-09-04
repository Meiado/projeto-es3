import { FastifyInstance, FastifyPluginOptions } from "fastify";
import JuridicaController from "../controllers/JuridicaController";

export default async function juridicaRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  
  fastify.post('/', JuridicaController.create);
  fastify.get('/', JuridicaController.findAll);
  fastify.get('/:id', JuridicaController.findOne);
  fastify.put('/:id', JuridicaController.update);
  fastify.delete('/:id', JuridicaController.delete);
  
}