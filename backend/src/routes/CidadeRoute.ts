import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CidadeController from "../controllers/CidadeController";

export default async function cidadeRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get('/', CidadeController.getAll);
  fastify.get('/:id', CidadeController.getById);
  fastify.get('/estado/:id', CidadeController.getByEstado);

}