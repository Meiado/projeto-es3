import { Especificacao, ItemDoacaoIn } from '@/services/doacao';
import { ProdutoOut } from '@/services/produto';
import React, { useState } from 'react';
import SelectEstoque from './SelectEstoque';

interface AdicionarItemProps {
    produtos: ProdutoOut[];
    itens: ItemDoacaoIn[];
    setItens: (itens: ItemDoacaoIn[]) => void;
    onAdicionarItem: (item: ItemDoacaoIn) => void;
}

const AdicionarItem: React.FC<AdicionarItemProps> = ({ itens, setItens, produtos, onAdicionarItem }) => {
    const [produtoSelecionado, setProdutoSelecionado] = useState<number | string>(0);
    const [produto, setProduto] = useState<ProdutoOut | null>(null);
    const [quantidadeDoada, setQuantidadeDoada] = useState<number | string>(0);
    const [especificacao, setEspecificacao] = useState(Especificacao.ONG);

    const handleProdutoChange = (event) => {
        setProdutoSelecionado(event.target.value);
        const p = produtos.find(p => p.pro_id === Number(event.target.value));
        setProduto(p!);
    };

    const handleQuantidadeChange = (event) => {
        setQuantidadeDoada(event.target.value);
    };

    const handleEspecificacaoChange = (event) => {
        setEspecificacao(event.target.value);
    };

    const adicionarItemDoacao = (event) => {
        event.preventDefault();
        if (produtoSelecionado && quantidadeDoada > 0) {
            const itemExistente = itens.find(item => item.pro_id === produtoSelecionado && item.itens_doa_especificacao === especificacao);
            if (itemExistente) {
                itemExistente.itens_doa_quantidade = Number(itemExistente.itens_doa_quantidade) + Number(quantidadeDoada);
                setItens([...itens]);
            } else {
                const itemDoacao: ItemDoacaoIn = {
                    pro_id: Number(produtoSelecionado),
                    itens_doa_quantidade: Number(quantidadeDoada),
                    itens_doa_especificacao: especificacao,
                };
                onAdicionarItem(itemDoacao);
            }
            setProdutoSelecionado(0);
            setQuantidadeDoada(0);
            setEspecificacao(Especificacao.ONG);
        }
    };

    return (
        <>
            <div className='columns-3'>
                <div className='form-control'>
                    <label className='label-text'>
                        <span className='label'>Produto:</span>
                    </label>
                    <select value={produtoSelecionado} className='select select-bordered' onChange={handleProdutoChange}>
                        <option value="">Selecione um produto</option>
                        {produtos.map(produto => (
                            <option key={produto.pro_id} value={produto.pro_id}>{produto.pro_nome}</option>
                        ))}
                    </select>
                </div>
                <div className='form-control'>
                    <label className='label-text'>
                        <span className='label'>Quantidade:</span>
                    </label>
                    <input type="number" className='input input-bordered no-spinner' value={quantidadeDoada || ''} onChange={handleQuantidadeChange} />
                </div>
                <div>
                    <label className='label-text'>
                        <span className='label'>Estoque:</span>
                    </label>
                    <SelectEstoque value={especificacao} produtoSelecionado={produto} onChange={handleEspecificacaoChange}/>
                </div>
            </div>
            <div className='grid place-content-center mt-4'>
                <button type="button" className='btn btn-outline btn-info w-full' onClick={adicionarItemDoacao}>Adicionar item</button>
            </div>
        </>
    );
}

export default AdicionarItem;
