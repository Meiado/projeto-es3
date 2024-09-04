import { FastifyInstance, FastifyPluginOptions } from "fastify";
import AuthController from "../controllers/AuthController";

export default async function authRoute(fastify: FastifyInstance, optional: FastifyPluginOptions) {

  fastify.post('/login', AuthController.login);
  fastify.get('/recover', { preHandler: [fastify.authenticate] }, AuthController.recover);

}