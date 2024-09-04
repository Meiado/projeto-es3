import api from '../api';

export interface TipoProduto {
    tipo_pro_id: number;
    tipo_pro_nome: string;
}

export interface ProdutoOut {
    pro_id: number;
    pro_nome: string;
    pro_descricao: string;
    pro_estoque_ong: number;
    pro_estoque_doacoes: number;
    tipo_pro_id: number;
}

export class ProdutoService {
    static async getProdutos(): Promise<ProdutoOut[]> {
        const response = await api.get('/produtos');
        return response.data;
    }
}
