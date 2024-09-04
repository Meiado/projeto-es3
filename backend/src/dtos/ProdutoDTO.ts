export interface ProdutoIn {
  pro_nome: string,
  pro_descricao: string,
  pro_estoque_ong: number,
  pro_estoque_doacoes: number,
  tipo_pro_id: number,
}

export interface ProdutoOut {
  pro_id: number,
  pro_nome: string,
  pro_descricao: string,
  pro_estoque_ong: number,
  pro_estoque_doacoes: number,
  tipo_pro_id: number
}

export interface ProdutoEstoqueIn {
  pro_id: number;
  quantidade: number;
}