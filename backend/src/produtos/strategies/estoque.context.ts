import { $Enums, Produto } from '@prisma/client';
import { EstoqueStrategy } from 'src/patterns/interfaces/Strategy';
import { EstoqueDoacoesStrategy, EstoqueOngStrategy } from './estoque.strategy';

export class EstoqueContext {
  private strategy: EstoqueStrategy;

  setStrategy(especificacao: $Enums.Especificacao) {
    if (especificacao === $Enums.Especificacao.ONG) {
      this.strategy = new EstoqueOngStrategy();
    } else if (especificacao === $Enums.Especificacao.DOACOES) {
      this.strategy = new EstoqueDoacoesStrategy(); // Adicionar estratégia para doação
    } else {
      throw new Error('Especificação de estoque não suportada');
    }
  }

  validarEstoque(produto: Produto, especicacao: $Enums.Especificacao): boolean {
    if (!this.strategy) throw new Error('Strategy não definida');
    return this.strategy.validate(produto, especicacao);
  }
}
