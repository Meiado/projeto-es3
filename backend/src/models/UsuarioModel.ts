import prisma from "../prisma";
import bcryptjs from "bcryptjs";
import { UsuarioIn, UsuarioOut } from "../dtos/UsuarioDTO";

export default class UsuarioModel {

  static async create(usuarioData: UsuarioIn): Promise<UsuarioOut> {
    const hashSenha = bcryptjs.hashSync(usuarioData.usu_senha, 10);
    usuarioData.usu_senha = hashSenha;
    const usuario = await prisma.usuario.create({ data: usuarioData });
    return usuario;
  }

  static async getByPesId(pes_id: number): Promise<UsuarioOut | null> {
    const usuario = await prisma.usuario.findUnique({ where: { pes_id: pes_id } });
    return usuario;
  }

  static async getById(usu_id: number): Promise<UsuarioOut | null> {
    const usuario = await prisma.usuario.findUnique({ where: { usu_id } });
    return usuario;
  }

}