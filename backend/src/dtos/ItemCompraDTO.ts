import { Prisma } from "@prisma/client";

export interface ItemCompraBody {
  pro_id: number,
  itens_com_quantidade: number,
  itens_com_valor: number
}

export interface ItemCompraIn {
  pro_id: number,
  com_id: number,
  itens_com_quantidade: number,
  itens_com_valor: number,
}

export interface ItemCompraOut {
  pro_id: number,
  com_id: number,
  itens_com_quantidade: number,
  itens_com_valor: Prisma.Decimal,
}
