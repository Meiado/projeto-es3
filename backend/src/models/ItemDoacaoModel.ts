import { ItemDoacaoBody } from "../dtos/ItensDoacaoDTO";
import prisma from "../prisma";

export default class ItemDoacaoModel {
    static async findByDoacaoId(id: number) {
        const itens = await prisma.itensDoacao.findMany({ where: { doa_id: id } });
        const itensBody: ItemDoacaoBody[] = itens.map(item => ({
            pro_id: item.pro_id,
            itens_doa_quantidade: item.itens_doa_quantidade,
            itens_doa_especificacao: item.itens_doa_especificacao
        }));
        return itensBody;
    }
}