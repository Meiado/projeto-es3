import { Especificacao } from "@prisma/client"

export interface ItemDoacaoBody {
    pro_id: number,
    itens_doa_quantidade: number,
    itens_doa_especificacao: Especificacao
  }
  
export interface ItemDoacaoIn {
    pro_id: number,
    doa_id: number,
    itens_doa_quantidade: number,
    itens_doa_especificacao: Especificacao
  }
  
export interface ItemDoacaoOut {
    pro_id: number,
    doa_id: number,
    itens_doa_quantidade: number,
    itens_doa_especificacao: Especificacao
  }