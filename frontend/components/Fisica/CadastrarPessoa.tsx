import { AiOutlinePlus } from 'react-icons/ai'
import FisicaModal from './FisicaModal';
import { useState } from 'react';
import FisicaForm from './FisicaForm';
import { FisicaOut } from '@/services/fisica';

interface CadastrarPessoaFisicaProps {
  fetchFisicas: () => void;
}


const CadastrarPessoaFisica: React.FC<CadastrarPessoaFisicaProps> = ({ fetchFisicas }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pessoaId, setPessoaId] = useState(0);
  
  return (
    <div>
      <button className="w-full btn btn-outline btn-info" onClick={() => setModalOpen(true)}> Nova Pessoa Física <AiOutlinePlus/> </button>
      <FisicaModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <FisicaForm fetchFisicas={fetchFisicas} pessoaId={pessoaId} modalOpen={modalOpen} setModalOpen={setModalOpen} setPessoaId={setPessoaId} />
        <button onClick={() => {setModalOpen(false); setPessoaId(0)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </FisicaModal>
    </div>
  );
};

export default CadastrarPessoaFisica;
