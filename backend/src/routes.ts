import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import cidadeRoute from "./routes/CidadeRoute";
import estadoRoute from "./routes/EstadoRoute";
import fisicaRoute from "./routes/FisicaRoute";
import juridicaRoute from "./routes/JuridicaRoute";
import permissaoRoute from "./routes/PermissaoRoute";
import statusRoute from "./routes/StatusRoute";
import usuarioRoute from "./routes/UsuarioRoute";
import authRoute from "./routes/AuthRoute";
import tipoProdutoRoute from "./routes/TipoProdutoRoute";
import produtoRoute from "./routes/ProdutoRoute";
import compraRoute from "./routes/CompraRoute";
import parametrizacaoRoute from "./routes/ParametrizacaoRoute";
import doacaoRoute from "./routes/DoacaoRoute";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get('/', async (request: FastifyRequest, replay: FastifyReply) => {
    return { version: '1.0.0', app: 'SSABA' };
  });

  await fastify.register(estadoRoute, { prefix: '/estados' });
  await fastify.register(cidadeRoute, { prefix: '/cidades' });
  await fastify.register(fisicaRoute, { prefix: '/fisicas' });
  await fastify.register(juridicaRoute, { prefix: '/juridicas' });
  await fastify.register(permissaoRoute, { prefix: '/permissoes' });
  await fastify.register(statusRoute, { prefix: '/status' });
  await fastify.register(usuarioRoute, { prefix: '/usuarios' });
  await fastify.register(authRoute, { prefix: '/auth' });
  await fastify.register(tipoProdutoRoute, { prefix: '/tipos-produto' });
  await fastify.register(produtoRoute, { prefix: '/produtos' });
  await fastify.register(compraRoute, { prefix: '/compras' });
  await fastify.register(parametrizacaoRoute, { prefix: '/parametrizacao' });
  await fastify.register(doacaoRoute, { prefix: '/doacao' });

}