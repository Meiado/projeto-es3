import { $Enums } from '@prisma/client';

export interface ItemDoacaoOut {
  pro_id: number;
  doa_id: number;
  itens_doa_quantidade: number;
  itens_doa_especificacao: $Enums.Especificacao;
}
