import { FisicaOut } from '@/services/fisica';
import React, { useState } from 'react';
import MensagemModal from './MensagemModal';
import { validarCPF } from '@/services/fisica/utils';
import { ProdutoOut } from '@/services/produto';
import { DoacaoIn, DoacaoService, ItemDoacaoIn } from '@/services/doacao';
import ItemModal from './ItemModal';
import AdicionarItem from './AdicionarItem';
import { FaAddressCard } from 'react-icons/fa';
import CardModal from '../Fisica/CardModal';
import FisicaCard from '../Fisica/FisicaCard';
import TabelaItens from './TabelaItens';
import { IoMdAdd } from "react-icons/io";
import { currencyMask } from '@/services/doacao/utils';

const InputMask = require('react-input-mask');

interface DoacaoFormProps {
    doadores: FisicaOut[];
    produtos: ProdutoOut[];
    setMenuOption: (option: string) => void;
    setModalOpen: (open: boolean) => void;
}

const DoacaoForm = ({ doadores, produtos, setMenuOption, setModalOpen }: DoacaoFormProps)  => {
    const [cpf, setCpf] = useState('');
    const [isAnonimo, setIsAnonimo] = useState(false);
    const [doador, setDoador] = useState<FisicaOut | null>(null); 
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [submessage, setSubmessage] = useState('');
    const [onConfirm, setOnConfirm] = useState(false);
    const [itensDoacao, setItensDoacao] = useState<ItemDoacaoIn[]>([]);
    const [valorDoacao, setValorDoacao] = useState<number | string>(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    const [isDinheiro, setIsDinheiro] = useState(false);

    const openModalItem = (event) => {
        event.preventDefault();
        setModalIsOpen(true);
    };

    const closeModalItem = (event) => {
        event.preventDefault();
        setModalIsOpen(false);
    };

    const onAdicionarItem = (itemDoacao: ItemDoacaoIn) => {
        const itemExistenteIndex = itensDoacao.findIndex(item => Number(item.pro_id) === Number(itemDoacao.pro_id) && item.itens_doa_especificacao === itemDoacao.itens_doa_especificacao);
        if (itemExistenteIndex !== -1) {
            const novosItens = [...itensDoacao];
            novosItens[itemExistenteIndex].itens_doa_quantidade += itemDoacao.itens_doa_quantidade;
            setItensDoacao(novosItens);
        } else {
            setItensDoacao([...itensDoacao, itemDoacao]);
        }
        closeModalItem;
    };

    const removerItemDoacao = (index) => {
        setItensDoacao(itensDoacao.filter((_, i) => i !== index));
    };

    const atualizarValorDoacao = (event) => {
        currencyMask(event);
        const valor = event.target.value;
        setValorDoacao(valor || '');
    };    

    const podeDoar = () => {
        return (doador || isAnonimo) && (itensDoacao.length > 0 || Number(valorDoacao) > 0);
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
        const cpfNumeros = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cpfNumeros.length === 11) {
            if (validarCPF(cpfNumeros)) {
                const doadorCadastrado = doadores.find(d => d.fis_cpf === cpfNumeros);
                if (doadorCadastrado && doadorCadastrado.pes_status) {
                    setDoador(doadorCadastrado);
                } else {
                    if (doadorCadastrado) {
                        setModalMessage('Cadastro inativo.');
                        setShowModal(true);
                    } else {
                        setModalMessage('Doador não encontrado. Deseja cadastrar o doador?');
                        setSubmessage('Você será redircionado para a tela de gerenciamento de pessoas.');
                        setOnConfirm(true);
                        setShowModal(true);
                    }
                }
            } else {
                setModalMessage('CPF inválido.');
                setShowModal(true);
            }
        } else {
            setDoador(null);
        }
    };

    const handleAnonimoChange = () => {
        setIsAnonimo(!isAnonimo);
        setCpf('');
        setDoador(null); 
    };

    const handleDinheiroChange = () => {
        setIsDinheiro(!isDinheiro);
        if (!isDinheiro) {
            setValorDoacao(0);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setOnConfirm(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let doacao = {
                doa_data: new Date().toISOString().split('T')[0],
                doa_dinheiro: Number(valorDoacao),
                itens_doacao: itensDoacao,
              };
            setModalMessage('Doação anônima registrada.');
            if(doador) {
                setModalMessage('Doação registrada.')
                doacao = {
                    ...doacao,
                    pes_id_doador: doador.pes_id,
                }
            }
            console.log(doacao);
            const result = await DoacaoService.create(doacao);
            console.log(result)
            if(result===200) {
                setCpf('');
                setIsAnonimo(false);
                setDoador(null);
                setItensDoacao([]);
                setValorDoacao(0);
                setModalOpen(false);
            }
        } catch (error) {
            console.error('Erro ao registrar doação:', error);
        }
    };
    
    return (
        <div className='h-full'>
            {showModal && <MensagemModal message={modalMessage} submessage={submessage} onConfirm={onConfirm} setMenuOption={setMenuOption} onClose={handleModalClose} />}
            <form className="h-full" onSubmit={handleSubmit}>
                <div>
                <label className='flex justify-center gap-3'>
                        <div className='flex form-control'>
                            <label className='input input-bordered flex items-center gap-2'>
                                Doador: 
                                <InputMask 
                                    mask="999.999.999-99" 
                                    value={cpf} 
                                    onChange={handleCpfChange}
                                    disabled={isAnonimo}
                                    className={''}
                                >
                                    {(inputProps) => <input {...inputProps} type="text" disabled={isAnonimo} placeholder='CPF' />}
                                </InputMask>
                                <span className='size-5'>
                                {doador && (
                                    <>
                                        <FaAddressCard cursor="pointer" onClick={() => setCardOpen(true)} className="text-center text-info" size={20} />
                                        <CardModal cardOpen={cardOpen} setCardOpen={setCardOpen}>
                                            <FisicaCard pessoaId={doador.pes_id} setCardOpen={setCardOpen} cardOpen={cardOpen}/>
                                        </CardModal>
                                    </>
                                )}
                                </span>
                            </label>
                        </div>                        
                        <div className='form-control flex justify-center'>
                            <label className="cursor-pointer label gap-2">
                                <input 
                                    type="checkbox" 
                                    checked={isAnonimo} 
                                    onChange={handleAnonimoChange}
                                    className='form-checkbox checkbox checkbox-sm checkbox-info' 
                                />
                                <span className="label-text">Doação anônima</span>
                            </label>
                        </div>
                    </label>
                </div>
                <div className='flex justify-center mt-4'>
                    <button onClick={openModalItem} className='btn btn-outline m-4 btn-info' disabled={(doador === null && !isAnonimo)}><IoMdAdd className='' size={20}/> Adicionar item</button>
                </div>
                <ItemModal modalOpen={modalIsOpen} setModalOpen={closeModalItem} >
                    <AdicionarItem itens={itensDoacao} setItens={setItensDoacao} produtos={produtos} onAdicionarItem={onAdicionarItem}/>
                    <button onClick={closeModalItem} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </ItemModal>
                <div className='flex-row justify-center     mt-4 h-1/2'>
                    {itensDoacao.length === 0 ? <p className=''>Não há itens.</p> :
                        <TabelaItens produtos={produtos} itensDoacao={itensDoacao} removerItemDoacao={removerItemDoacao} />
                    }
                </div>
                <div className='flex justify-center'>
                    <div className='form-control'>
                        <label className="cursor-pointer label gap-2">
                            <input 
                                type="checkbox" 
                                checked={isDinheiro && (doador || isAnonimo)} 
                                onChange={handleDinheiroChange}
                                className='form-checkbox checkbox checkbox-sm checkbox-info w-32' 
                                disabled={!(doador || isAnonimo)}
                            />
                            <span className="label-text">Adicionar valor em dinheiro</span>
                        </label>      
                    </div>
                </div>
                <div className='form-control grid place-content-center h-10'>
                    {isDinheiro && (doador || isAnonimo) && (
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            R$
                            <input 
                                type="text" 
                                value={valorDoacao} 
                                onChange={atualizarValorDoacao} 
                                placeholder="0.00" 
                                className="grow w-24 text-end"
                            />
                        </label>
                    )}
                </div>
                <div className='form-control grid place-content-center'>
                    <button  disabled={!podeDoar()} type='submit' className="btn btn-info w-48 mt-10">
                        Registrar doação
                    </button>
                </div>
            </form>
        </div>
    );
    
};

export default DoacaoForm;