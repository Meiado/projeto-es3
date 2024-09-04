import fastifyPlugin from 'fastify-plugin';
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import { FastifyRequest, FastifyReply } from 'fastify';
import AppError from '../utils/AppError';
import { User } from '../../@types/types';
import UsuarioModel from '../models/UsuarioModel';
import PessoaModel from '../models/PessoaModel';
import { Payload } from '../../@types/payload';

interface DecodedToken {
  payload: {
    usuario: User;
  };
}

export default fastifyPlugin<FastifyJWTOptions>(async (fastify) => {

  fastify.register(fastifyJwt, {
    secret: process.env.PRIVATE_KEY || '', // Acessa a variável de ambiente PRIVATE_KEY
    decode: { complete: true },
    sign: { algorithm: 'HS256', expiresIn: '1h' },
    decoratorName: 'jwtUser',
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        const decodedToken = await request.jwtDecode() as DecodedToken;
        const { usuario } = decodedToken.payload;
        const user = await UsuarioModel.getById(usuario.id);

        if (!user)
          throw new AppError('Usuário não encontrado', 404);

        const pessoa = await PessoaModel.getById(user.pes_id);
        if (!pessoa)
          throw new AppError('Pessoa não encontrada', 404);

        const usuarioData: Payload = {
          id: user.usu_id,
          nome: pessoa.pes_nome,
          email: pessoa.pes_email,
          avatar: user.usu_foto,
          perfil: 'Admin',
          role: 1
        };

        request.user = usuarioData;

      } catch (error) {
        throw new AppError('Token inválido', 401);
      }
    }
  );
});
