import prisma from "../prisma";
import { PermissaoOut } from "../dtos/PermissaoDTO";

export default class PermissaoModel {

  static async getAll(): Promise<Array<PermissaoOut>> {
    const permissoes = await prisma.tiposPermissao.findMany();
    return permissoes;
  }

  static async getById(tp_id: number): Promise<PermissaoOut|null> {
    const permissao = await prisma.tiposPermissao.findUnique({ where: { tp_id: tp_id} });
    return permissao;
  }

}