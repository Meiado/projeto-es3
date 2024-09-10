import { Estado } from '@prisma/client';

export class EstadoEntity implements Estado {
  est_id: number;
  est_nome: string;
  est_uf: string;
}
