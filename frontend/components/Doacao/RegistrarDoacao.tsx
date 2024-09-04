import { useState } from "react";
import DoacaoModal from "./DoacaoModal";
import DoacaoForm from "./DoacaoForm";
import { FisicaOut } from "@/services/fisica";
import { ProdutoOut } from "@/services/produto";
import { AiOutlinePlus } from "react-icons/ai";

interface CadastrarPessoaFisicaProps {
    doadores: FisicaOut[];
    produtos: ProdutoOut[];
    setMenuOption: (option: string) => void;
    setNovaDoacao: (nova: boolean) => void;
  }
  
  
  const CadastrarPessoaFisica: React.FC<CadastrarPessoaFisicaProps> = ({ doadores, produtos, setMenuOption, setNovaDoacao }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = (open: boolean) => {
        if(!open)
            setNovaDoacao(true);
        setModalOpen(open);
    }
    
    return (
      <div>
        <button className="w-48 btn btn-outline btn-info" onClick={() => setModalOpen(true)}> Nova doação <AiOutlinePlus/> </button>
        <DoacaoModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <DoacaoForm setModalOpen={handleModalOpen} doadores={doadores} produtos={produtos} setMenuOption={setMenuOption}/>
          <button onClick={(event) =>{event?.preventDefault(); setModalOpen(false)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </DoacaoModal>
      </div>
    );
  };
  
  export default CadastrarPessoaFisica;
  