import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import handleErrors from "./middlewares/handleErros";
import fastifyAuthPlugin from "./plugins/jwtVerification";
require('dotenv').config();

const app = Fastify({ logger: true });

const start = async () => {
  app.setErrorHandler(handleErrors);

  await app.register(cors);

  // Registro do seu plugin de autenticação
  await app.register(fastifyAuthPlugin);


  await app.register(routes);

  try {
    await app.listen({ port: 5000 });
  } catch (err) {
    process.exit(1);
  }
}

start();