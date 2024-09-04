import CompraService, { CompraData } from "@/services/compra";
import { formatCurrency, formatCurrencyNumber } from "@/services/fisica/utils";
import { format, formatDate } from "date-fns";
import { SelectHTMLAttributes, useState } from "react";
import { FaAddressCard, FaEdit, FaTrash } from "react-icons/fa";
import CompraModal from "./CompraModal";
import CompraForm from "./CompraForm";

interface ListaComprasProps {
  compras: CompraData[];
  fetchCompras: () => void;
}

export default function ListaCompras({ compras, fetchCompras }: ListaComprasProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [compraId, setCompraId] = useState(0);
  const [cardOpen, setCardOpen] = useState(false);
  const [filterData, setFilterData] = useState('mais-recentes');

  const handleDelete = (id: number) => {
    if (confirm('Deseja excluir essa compra?')) {
      CompraService.remove(id).then(() => {
        fetchCompras()
      }).catch(() => {
        alert('Ocorreu um erro inesperado!');
      });
    }
  }

  // Função de ordenação por data
  const sortByDate = (a: CompraData, b: CompraData) => {
    if (filterData === 'mais-recentes') {
      return new Date(b.com_data_compra) - new Date(a.com_data_compra);
    } else {
      return new Date(a.com_data_compra) - new Date(b.com_data_compra);
    }
  };

  const sortedCompras = compras.slice().sort(sortByDate);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <select className="select select-bordered" value={filterData} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterData(e.target.value)}>
          <option value="mais-recentes">Mais recentes</option>
          <option value="mais-antigos">Mais antigos</option>
        </select>
      </div>
      <div className="flex items-center space-x-12">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 35 }}>#</th>
              <th>Data da Compra</th>
              <th>Valor</th>
              <th style={{ width: 40 }}></th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {sortedCompras.map((item, i) => (
              <tr key={`table-item-compra-${i}`}>
                <td>{item.com_id}</td>
                <td>{format(item.com_data_compra, 'dd/MM/yyyy')}</td>
                <td>R$ {formatCurrencyNumber(Number(item.com_valor_total))}</td>
                <td>
                  <FaEdit cursor="pointer" onClick={() => { setCompraId(item.com_id); setModalOpen(true) }} className="text-blue-300" size={20} />
                  <CompraModal modalOpen={modalOpen && item.com_id === compraId} setModalOpen={setModalOpen}>
                    <CompraForm compraId={compraId} modalOpen={modalOpen && item.com_id === compraId} setModalOpen={setModalOpen} fetchCompras={fetchCompras} setCompraId={setCompraId} />
                    <button onClick={() => { setModalOpen(false); setCompraId(0) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </CompraModal>
                </td>
                <td>
                  {/* <FaAddressCard cursor="pointer" onClick={() => { setCardOpen(true), setCompraId(item.com_id) }} className="text-blue-300" size={20} /> */}
                  <FaTrash cursor='pointer' size={20} className="text-blue-300" onClick={() => handleDelete(item.com_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}