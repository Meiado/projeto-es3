import { $Enums, ItensDoacao } from '@prisma/client';

export class ItensDoacaoEntity implements ItensDoacao {
  doa_id: number;
  pro_id: number;
  itens_doa_quantidade: number;
  itens_doa_especificacao: $Enums.Especificacao;
}
