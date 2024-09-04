import { FastifyInstance, FastifyPluginOptions } from "fastify";
import UsuarioController from "../controllers/UsuarioController";

export default async function usuarioRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.post('/', UsuarioController.create);

}