import api from '../api';

export interface ItemDoacaoIn {
    pro_id: number;
    itens_doa_quantidade: number;
    itens_doa_especificacao: Especificacao;
}

export enum Especificacao {
    ONG = 'ONG',
    DOACOES = 'DOACOES',
}

export interface DoacaoIn {
    doa_data: string;
    doa_dinheiro: number;
    pes_id_doador: number;
    itens_doacao: ItemDoacaoIn[];
}

export interface DoacaoOut {
    doa_id: number;
    doa_data: string;
    doa_dinheiro: number;
    pes_id_doador: number;
    itens_doacao: ItemDoacaoIn[];
}
export interface DoacaoAnonimaIn {
    doa_data: string;
    doa_dinheiro: number;
    itens_doacao: ItemDoacaoIn[];
}

export class DoacaoService {
    static async create(doacao: DoacaoIn | DoacaoAnonimaIn) {
        const response = await api.post('/doacao', doacao);
        return response.status;
    }

    static async getDoacoes() {
        const response = await api.get('/doacao');
        return response.data;
    }

    static async removerDoacao(id: number) {
        const response = await api.delete(`/doacao/${id}`);
        return response.data;
    }
}