import { $Enums, Especificacao } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateItemDoacaoDto {
  @IsNumber()
  pro_id: number;

  @IsNumber()
  itens_doa_quantidade: number;

  @IsEnum(Especificacao)
  itens_doa_especificacao: $Enums.Especificacao;
}
