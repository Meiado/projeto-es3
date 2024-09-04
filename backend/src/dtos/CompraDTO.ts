import { Prisma } from "@prisma/client"
import { ItemCompraBody, ItemCompraOut } from "./ItemCompraDTO"
import { ProdutoOut } from "./ProdutoDTO"

export interface CompraBody {
  com_data_compra: Date,
  pes_id: number,
  itens_compra: Array<ItemCompraBody>
}

export interface CompraIn {
  com_data_compra: Date,
  com_valor_total: number,
  pes_id: number,
}

export interface CompraOut {
  com_id: number,
  com_data_compra: Date,
  com_data_registro: Date,
  com_valor_total: Prisma.Decimal,
  pes_id: number
}

export interface CompraItensOut extends CompraOut {
  itens_compra: Array<{
    produto: ProdutoOut,
    itens_com_quantidade: number,
    itens_com_valor: Prisma.Decimal
  }>
} 