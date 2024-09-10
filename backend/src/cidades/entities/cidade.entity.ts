import { Cidade } from '@prisma/client';

export class CidadeEntity implements Cidade {
  cid_id: number;
  cid_nome: string;
  est_id: number;
}
