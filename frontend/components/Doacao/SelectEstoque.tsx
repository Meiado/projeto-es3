import { ProdutoOut } from '@/services/produto';
import React from 'react';

interface SelectEstoqueProps {
  onChange: (e: any) => void;
  value: string;
  produtoSelecionado?: ProdutoOut | null;
}

function SelectEstoque({ onChange, value, produtoSelecionado }: SelectEstoqueProps) {
  if (!produtoSelecionado) {
    return <select className=' w-full select select-bordered' disabled><option value="">Nenhum produto selecionado</option></select>;
  }

  const isOngDisponivel = produtoSelecionado.pro_estoque_ong - produtoSelecionado.pro_estoque_doacoes > 15 || produtoSelecionado.pro_estoque_doacoes === 0;
  const isDoacoesDisponivel = produtoSelecionado.pro_estoque_ong - produtoSelecionado.pro_estoque_doacoes < 15 || produtoSelecionado.pro_estoque_ong === 0;

  return (
    <select onChange={onChange} className=' w-full select select-bordered' value={value}>
      {isOngDisponivel && <option value="ONG">Estoque ONG</option>}
      {isDoacoesDisponivel && <option value="Doacoes">Estoque Doações</option>}
    </select>
  );
}

export default SelectEstoque;
