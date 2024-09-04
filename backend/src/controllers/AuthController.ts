import { FastifyRequest, FastifyReply } from "fastify";
import { AuthLoginIn } from "../dtos/AuthDTO";
import { authLoginSchema } from "../schemas/AuthSchema";
import { joiOptions } from "../schemas";
import PessoaModel from "../models/PessoaModel";
import AppError from "../utils/AppError";
import UsuarioModel from "../models/UsuarioModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthController {

  static async login(req: FastifyRequest<{ Body: AuthLoginIn }>, res: FastifyReply) {
    await authLoginSchema.validateAsync(req.body, joiOptions);

    const data = req.body;

    const pessoa = await PessoaModel.getByEmail(data.email);

    if (!pessoa)
      throw new AppError('E-mail não está cadastrado', 400);

    const usuario = await UsuarioModel.getByPesId(pessoa.pes_id);

    if (!usuario)
      throw new AppError('Pessoa não possui um usuário', 400);

    const validSenha = bcryptjs.compareSync(data.senha, usuario.usu_senha);
    if (!validSenha)
      throw new AppError('Senha incorreta', 401);

    const usuarioData = {
      id: usuario.usu_id,
      nome: pessoa.pes_nome,
      email: pessoa.pes_email,
      avatar: usuario.usu_foto,
      perfil: 'Admin',
      role: 1
    };

    const token = jwt.sign({ usuario: usuarioData }, process.env.PRIVATE_KEY || "", { expiresIn: '60m' });

    const response = { usuario: usuarioData, token: token }

    res.code(200).send(response);
  }

  static async recover(req: FastifyRequest, res: FastifyReply) {
    const user = req.user;
    res.code(200).send(user);
  }

}