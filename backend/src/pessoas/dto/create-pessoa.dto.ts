import { IsBoolean, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreatePessoaDto {
  @IsString()
  pes_nome: string;
  @IsEmail()
  pes_email: string;
  @IsPhoneNumber('BR')
  pes_telefone: string;
  @IsString()
  pes_logradouro: string;
  @IsString()
  pes_complemento: string;
  @IsString()
  pes_numero: string;
  @IsString()
  pes_bairro: string;
  @IsString()
  est_sigla: string;
  @IsString()
  cid_nome: string;
  @IsBoolean()
  pes_status: boolean;
}
