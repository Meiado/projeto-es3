import React, { useEffect, useState } from "react";
import { DoacaoOut, ItemDoacaoIn, Especificacao, DoacaoService } from "@/services/doacao";
import { ProdutoOut } from "@/services/produto";

interface DoacaoCardProps {
  setCardOpen: (open: boolean) => boolean | void;
  produtos: ProdutoOut[];
  doacao: DoacaoOut;
  cardOpen: boolean;
}

const DoacaoCard: React.FC<DoacaoCardProps> = ({ doacao, setCardOpen, produtos, cardOpen }) => {

  const closeModalCard = (event) => {
    event.preventDefault();
    console.log(doacao);
    console.log(produtos);
    setCardOpen(false);
  };

  const getProdutoNome = (id: number) => {
    const produto = produtos.find(p => p.pro_id === id);
    return produto ? produto.pro_nome : 'Produto não encontrado';
  };

  const agruparPorEspecificacao = (itens: ItemDoacaoIn[]) => {
    return itens.reduce((acc, item) => {
      const key = Especificacao[item.itens_doa_especificacao];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };

  const itensAgrupados = agruparPorEspecificacao(doacao.itens_doacao);

  return (
    <div className="card card-compact w-full max-w-lg  shadow-xl rounded-lg overflow-hidden">
      <div className="card-body p-6">
        <h1 className="card-title text-center text-2xl font-bold mb-4 text-info">Itens recebidos</h1>
        {
          doacao && (
            <div className="space-y-2">
              {Object.entries(itensAgrupados).map(([especificacao, itens], index) => (
                <div key={index} className="p-4 hover:bg-base-100 rounded shadow-sm">
                  <h2 className="font-semibold text-lg text-gray">{especificacao === 'ONG' ? 'Estoque ONG:' : 'Estoque de doações:'}</h2>
                  {itens.map((item: ItemDoacaoIn, index: number) => (
                    <div key={index} className="flex justify-between mt-2">
                      <span className="text">{`${getProdutoNome(item.pro_id)}: ${item.itens_doa_quantidade} unidades`}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        }
        <div className="card-actions mt-4 justify-end">
          <button className="btn btn-outline btn-info" onClick={closeModalCard}>Voltar</button>
        </div>
      </div>
    </div>
  );
};

export default DoacaoCard;
