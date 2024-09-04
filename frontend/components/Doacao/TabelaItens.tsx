import { ProdutoOut } from '@/services/produto';
import { ItemDoacaoIn } from '@/services/doacao';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoMdRemoveCircle } from 'react-icons/io';

interface TabelaItensProps {
    produtos: ProdutoOut[];
    itensDoacao: ItemDoacaoIn[];
    removerItemDoacao: (index: number) => void;
}

const TabelaItens: React.FC<TabelaItensProps> = ({ produtos, itensDoacao, removerItemDoacao }) => {
    const getNomeProduto = (id: number) => {
        const produto = produtos.find(p => p.pro_id === id);
        return produto ? produto.pro_nome : 'Produto não encontrado';
    };

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Estoque de destino</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {itensDoacao.map((item, index) => (
                    <tr className='hover' key={index}>
                        <td>{getNomeProduto(item.pro_id)}</td>
                        <td>{item.itens_doa_quantidade}</td>
                        <td>{item.itens_doa_especificacao}</td>
                        <td>
                            <button className='flex tooltip tooltip-error tooltip-left' data-tip="Remover" type="button" onClick={() => removerItemDoacao(index)}>
                                <IoMdRemoveCircle className="text-error" size={18}/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TabelaItens;
