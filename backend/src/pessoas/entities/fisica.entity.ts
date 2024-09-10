import { Fisica } from '@prisma/client';

export class FisicaEntity implements Fisica {
  pes_id: number;
  fis_cpf: string;
  fis_rg: string;
  sex_id: number;
  fis_data_nascimento: Date;
}
