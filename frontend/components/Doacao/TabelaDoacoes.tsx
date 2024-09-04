import { DoacaoOut } from '@/services/doacao';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { IoMdRemoveCircle } from "react-icons/io";
import { BiSolidDetail } from "react-icons/bi";
import { FisicaOut } from '@/services/fisica';
import { ProdutoOut } from '@/services/produto';
import { adicionarUmDia, currencyFormat } from '@/services/doacao/utils';
import CardModal from '../Fisica/CardModal';
import DoacaoCard from './DoacaoCard';
import MensagemModal from './MensagemModal';


interface TabelaDoacoesProps {
    doacoes: DoacaoOut[];
    doadores: FisicaOut[];
    produtos: ProdutoOut[];
    removerDoacao: (id: number) => void;
    setMenuOption: (option: string) => void;
}

const TabelaDoacoes: React.FC<TabelaDoacoesProps> = ({ doadores, produtos, doacoes, removerDoacao, setMenuOption }) => {
    const [cardOpen, setCardOpen] = useState(false);
    const [doacaoSelecionada, setDoacaoSelecionada] = useState<DoacaoOut | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [doacaoToRemove, setDoacaoToRemove] = useState<number | null>(null);
    const [filtroDataInicio, setFiltroDataInicio] = useState(''); 
    const [filtroDataFim, setFiltroDataFim] = useState(''); 

    const confirmaRemoverDoacao = (id: number) => {
        setModalMessage('Você realmente deseja excluir esta doação?');
        setDoacaoToRemove(id);
        setModalOpen(true);
    };

    const getNomeDoador = (id: number | null) => {
        const doador = doadores.find(d => d.pes_id === id);
        return id ? doador?.pes_nome : 'Anônimo';
    };

    const doacoesFiltradas = doacoes.filter(doacao => {
        if (!filtroDataInicio || !filtroDataFim) return true;
        const dataDoacao = format(doacao.doa_data, 'yyyy-MM-dd');
        return dataDoacao >= filtroDataInicio && dataDoacao <= filtroDataFim;
    });

    return (
    <>
        <div className="flex justify-center items-center my-4 gap-3">
                <label className="input input-bordered flex items-center gap-2">
                    Data inicial:
                    <input type="date" value={filtroDataInicio} onChange={e => setFiltroDataInicio(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Data final:
                    <input type="date" value={filtroDataFim} onChange={e => setFiltroDataFim(e.target.value)} />
                </label>
        </div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Doação</th>
                    <th>Data</th>
                    <th>Valor doado</th>
                    <th>Itens</th>
                    <th>Doador</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {doacoesFiltradas.map((doacao) => (
                    <tr className='hover' key={doacao.doa_id}>
                        <td className='flex gap-5'>
                            {doacao.doa_id}
                        </td>
                        <td>{format(adicionarUmDia(doacao.doa_data),"dd/MM/yyyy")}</td>
                        <td>{doacao.doa_dinheiro > 0 ? `R$ ${currencyFormat(doacao.doa_dinheiro.toString())}` : 'Somente itens'}</td>
                        <td>
                        {doacao.itens_doacao.length > 0 ? (
                            <div className='flex tooltip tooltip-info tooltip-left' data-tip="Exibir">
                                <BiSolidDetail className='cursor-pointer text-info'  onClick={() => { setCardOpen(true); setDoacaoSelecionada(doacao); } } size={20} />
                            </div>
                        ) : (
                            <div className='flex tooltip tooltip-left' data-tip="Sem itens">
                                <BiSolidDetail className='cursor-not-allowed text-neutral' size={20} />
                            </div>
                        )}
                        {cardOpen && doacaoSelecionada === doacao && (
                            <CardModal cardOpen={cardOpen} setCardOpen={setCardOpen}>
                                <DoacaoCard produtos={produtos} doacao={doacao} setCardOpen={setCardOpen} cardOpen={cardOpen}/>
                            </CardModal>
                        )}
                        </td>

                        <td>{getNomeDoador(doacao.pes_id_doador)}</td>
                        <td className='flex gap-4'>
                            <button  className='flex tooltip tooltip-error tooltip-left' data-tip="Remover" type="button" onClick={() => confirmaRemoverDoacao(doacao.doa_id)}>
                                <IoMdRemoveCircle className="text-error" size={18} />
                            </button>
                            {modalOpen && (
                                <MensagemModal 
                                    message={modalMessage}
                                    submessage='Todos os itens resgistrados no estoque serão removidos.'
                                    onClose={() => setModalOpen(false)}
                                    onConfirmRemoval={() => {
                                        removerDoacao(doacaoToRemove!);
                                        setModalOpen(false);
                                    } }
                                    setMenuOption={setMenuOption}
                                    setModalOpen={setModalOpen} onConfirm={false}
                                 />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    );
};

export default TabelaDoacoes;
