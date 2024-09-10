import {
  IsArray,
  IsDateString,
  IsDecimal,
  IsNumber,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateItemDoacaoDto } from './create-item-doacao.dto';

export class CreateDoacaoDto {
  @IsNumber()
  doa_id: number;
  @IsDateString()
  doa_data: Date;
  @IsDecimal()
  doa_dinheiro: number;
  @IsNumber()
  @ValidateIf((o) => o.pes_id_doador !== null)
  pes_id_doador: number | null;
  @IsArray()
  @ValidateNested({ each: true })
  itens_doacao: CreateItemDoacaoDto[]; // Itens da doação (se houver)
}
