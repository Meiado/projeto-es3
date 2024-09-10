import { Doacao, Prisma } from '@prisma/client';

export class DoacoesEntity implements Doacao {
  doa_id: number;
  doa_data: Date;
  doa_dinheiro: Prisma.Decimal;
  pes_id_doador: number | null;
}
