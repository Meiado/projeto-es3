import { FastifyInstance, FastifyPluginOptions } from "fastify";
import EstadoController from "../controllers/EstadoController";


export default async function estadoRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get('/', EstadoController.getAll);
  fastify.get('/:id', EstadoController.getById);

}