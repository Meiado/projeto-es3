import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CompraModal from "./CompraModal";
import CompraForm from "./CompraForm";

interface CadastrarCompraProps {
  fetchCompras: () => void;
}

export default function CadastrarCompra({ fetchCompras }: CadastrarCompraProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [compraId, setCompraId] = useState(0);

  return (
    <div>
      <button className="w-full btn btn-primary" onClick={() => setModalOpen(true)}> <AiOutlinePlus /> Cadastrar Compra</button>
      <CompraModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <button onClick={() => { setModalOpen(false); setCompraId(0) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <CompraForm compraId={compraId} modalOpen={modalOpen} setModalOpen={setModalOpen} setCompraId={setCompraId} fetchCompras={fetchCompras} />
      </CompraModal>
    </div>
  )
}