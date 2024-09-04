import { FastifyInstance, FastifyPluginOptions } from "fastify";
import StatusController from "../controllers/StatusController";

export default async function statusRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  
  fastify.get('/', StatusController.getAll);

}