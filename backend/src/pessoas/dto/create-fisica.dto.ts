import { IsDateString, IsNumber, IsString } from 'class-validator';
import { CreatePessoaDto } from './create-pessoa.dto';

export class CreateFisicaDto extends CreatePessoaDto {
  @IsString()
  fis_cpf: string;
  @IsString()
  fis_rg: string;
  @IsNumber()
  sex_id: number;
  @IsDateString()
  fis_data_nascimento: string;
}
