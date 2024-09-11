import { $Enums, Produto } from '@prisma/client';
import { EstoqueStrategy } from 'src/patterns/interfaces/Strategy';

export class EstoqueOngStrategy implements EstoqueStrategy {
  validate(produto: Produto, especificacao: $Enums.Especificacao): boolean {
    return (
      (produto.pro_estoque_ong - produto.pro_estoque_doacoes > 15 ||
        produto.pro_estoque_doacoes === 0) &&
      $Enums.Especificacao.ONG === especificacao
    );
  }
}

export class EstoqueDoacoesStrategy implements EstoqueStrategy {
  validate(produto: Produto, especificacao: $Enums.Especificacao): boolean {
    return (
      (produto.pro_estoque_ong - produto.pro_estoque_doacoes < 15 ||
        produto.pro_estoque_ong === 0) &&
      $Enums.Especificacao.DOACOES === especificacao
    );
  }
}
