import { Pessoa } from '@prisma/client';

export class PessoaEntity implements Pessoa {
  pes_logradouro: string;
  pes_complemento: string;
  pes_numero: string;
  pes_bairro: string;
  cid_id: number;
  pes_status: boolean;
  pes_id: number;
  pes_nome: string;
  pes_email: string;
  pes_senha: string;
  pes_cpf: string;
  pes_telefone: string;
  pes_data_nascimento: Date;
  pes_genero: string;
}
