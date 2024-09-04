import FisicaService, { FisicaOut } from "@/services/fisica";
import { formataCPF, formataTelefone } from "@/services/fisica/utils";
import { useEffect, useState } from "react";
import { FaEdit, FaAddressCard } from "react-icons/fa";
import { GrStatusGood, GrStatusDisabled } from "react-icons/gr";
import FisicaModal from "./FisicaModal";
import FisicaForm from "./FisicaForm";
import FisicaCard from "./FisicaCard";
import CardModal from "./CardModal";

interface ListaPessoasFisicasProps {
  fetchFisicas: () => void;
  fisicas: FisicaOut[];
}

const ListaPessoasFisicas: React.FC<ListaPessoasFisicasProps> = ({ fetchFisicas, fisicas }) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [pessoaId, setPessoaId] = useState(0);
  const [cardOpen, setCardOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState(true);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroInativos, setFiltroInativos] = useState(false);

  const handleFilterInativosChange = () => {
    setFiltroInativos(!filtroInativos);
  };
  
  const handleFilterNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroNome(e.target.value);
  };

  const handleFilterStatusChange = () => {
    setFiltroStatus(!filtroStatus);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center space-x-12">
        <input 
          type="text" 
          value={filtroNome} 
          onChange={handleFilterNomeChange} 
          placeholder="Filtrar por nome" 
          className="input px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-info w-2/3"
        />
        <label className="cursor-pointer label flex items-center space-x-4 w-1/4">
          <input 
            type="checkbox" 
            onChange={handleFilterStatusChange} 
            defaultChecked 
            className="form-checkbox checkbox checkbox-sm checkbox-info"
          />
          <span className="label-text">Cadastros ativos</span>
        </label>
        <label className="cursor-pointer label flex items-center space-x-4 w-1/4">
          <input 
            type="checkbox" 
            onChange={handleFilterInativosChange} 
            className="form-checkbox checkbox checkbox-sm checkbox-info"
          />
          <span className="label-text">Cadastros inativos</span>
        </label>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {fisicas
              .filter((fisica) => filtroNome === "" || fisica.pes_nome.toLowerCase().includes(filtroNome.toLowerCase()))
              .filter((fisica) => (filtroStatus && fisica.pes_status) || (filtroInativos && !fisica.pes_status))
              .map((fisica, index) => (
              <tr className="hover" key={index}>
                <td>{fisica.pes_nome}</td>
                <td>{formataCPF(fisica.fis_cpf)}</td>
                <td>{fisica.pes_email}</td>
                <td>{formataTelefone(fisica.pes_telefone)}</td>
                <td>{fisica.pes_status ? <div className='flex tooltip tooltip-success tooltip-left' data-tip="Ativo"><GrStatusGood className="text-success size-5"/></div> : <div className='flex tooltip tooltip-error tooltip-left' data-tip="Inativo"><GrStatusDisabled className="text-error size-5"/></div>}</td>
                <td>
                  <div className='flex tooltip tooltip-info tooltip-left' data-tip="Alterar">
                    <FaEdit cursor="pointer" onClick={() => { setPessoaId(fisica.pes_id); setModalOpen(true) } } className="text-info" size={20} />
                  </div>
                  <FisicaModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                    <FisicaForm pessoaId={pessoaId} modalOpen={modalOpen} setModalOpen={setModalOpen} setPessoaId={setPessoaId} fetchFisicas={fetchFisicas}/>
                    <button onClick={() => {setModalOpen(false); setPessoaId(0)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </FisicaModal>
                </td>
                <td>
                  <div className='flex tooltip tooltip-info tooltip-left' data-tip="Detalhes">
                    <FaAddressCard cursor="pointer" onClick={() => { setCardOpen(true), setPessoaId(fisica.pes_id) } } className="text-info" size={20} />
                  </div>
                  <CardModal cardOpen={cardOpen} setCardOpen={setCardOpen}>
                    <FisicaCard pessoaId={pessoaId} setCardOpen={setCardOpen} cardOpen={cardOpen}/>
                  </CardModal>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPessoasFisicas;