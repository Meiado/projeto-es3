'use client';
import CadastrarCompra from "@/components/CadastrarCompra";
import ListaCompras from "@/components/ListaCompras";
import CompraService, { CompraData } from "@/services/compra";
import { useEffect, useState } from "react";

export default function ComprasIndex() {
  const [compras, setCompras] = useState<CompraData[]>([]);

  const fetchCompras = async () => {
    const data = await CompraService.getAll();
    setCompras(data);
  }

  useEffect(() => {
    fetchCompras();
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Gerenciamento de compras</h1>
        <CadastrarCompra fetchCompras={fetchCompras} />
      </div>
      <ListaCompras compras={compras} fetchCompras={fetchCompras} />
    </main>
  );
}
