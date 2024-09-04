import 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from './types';
declare module 'fastify' {

  type Authenticate = (
    request: FastifyRequest,
    reply: FastifyReply
  ) => Promise<void>;

  /** Apply the extension */
  interface FastifyInstance {
    authenticate: Authenticate;
  }

  interface FastifyRequest {
    user: User;
  }
}
