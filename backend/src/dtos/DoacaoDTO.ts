import { Prisma } from "@prisma/client";
import { ItemDoacaoBody, ItemDoacaoOut } from "./ItensDoacaoDTO";

export interface DoacaoBody {
    doa_data: Date,
    doa_dinheiro: Prisma.Decimal,
    pes_id_doador: number | null,
    itens_doacao: Array<ItemDoacaoBody>
  }
  export interface DoacaoOutBody {
    doa_id: number;
    doa_data: Date,
    doa_dinheiro: Prisma.Decimal,
    pes_id_doador: number | null,
    itens_doacao: Array<ItemDoacaoBody>
  }

  export interface DoacaoIn {
    doa_data: Date,
    doa_dinheiro: Prisma.Decimal,
    pes_id_doador: number | null,
  }
  
  export interface DoacaoOut {
    doa_id: number,
    doa_data: Date,
    doa_dinheiro: Prisma.Decimal,
    pes_id_doador: number | null
  }
  
  export interface DoacaoItensOut extends DoacaoOut {
    itens_doacao: ItemDoacaoOut[]
  }