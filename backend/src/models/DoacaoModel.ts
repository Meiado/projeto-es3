import { DoacaoOut } from "../dtos/DoacaoDTO";
import prisma from "../prisma";

export default class DoacaoModel {
    static async getAll() {
        const doacoes: DoacaoOut[] = await prisma.doacao.findMany();
        return doacoes;
    }
    static async getById(id: number) {
        const doacao = await prisma.doacao.findUnique({ where: { doa_id: id } });
        return doacao;
    }
    static async create() {}
}