import { $Enums, Produto } from '@prisma/client';

export interface EstoqueStrategy {
  validate(produto: Produto, especificacao: $Enums.Especificacao): boolean;
}
