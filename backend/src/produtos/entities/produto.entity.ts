import { Produto } from '@prisma/client';

export class ProdutoEntity implements Produto {
  pro_id: number;
  pro_nome: string;
  pro_descricao: string;
  pro_estoque_ong: number;
  pro_estoque_doacoes: number;
  tipo_pro_id: number;
}
