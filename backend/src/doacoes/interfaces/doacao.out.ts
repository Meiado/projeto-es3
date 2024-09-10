import { Prisma } from '@prisma/client';
import { ItemDoacaoOut } from './item-doacao.out';

export interface DoacaoOut {
  doa_id: number;
  doa_data: Date;
  doa_dinheiro: Prisma.Decimal;
  pes_id_doador: number | null;
  itens_doacao: Array<ItemDoacaoOut>;
}
