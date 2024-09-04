import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CompraItemModal, { CompraItemSubmitData } from "./CompraItemModal";
import { formatCurrencyNumber, formatDateSave } from "@/services/fisica/utils";
import ProdutoService, { ProdutosData } from "@/services/produto";
import CompraService, { CompraDataStore, CompraItemData } from "@/services/compra";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";

interface CompraFormProps {
  compraId: number;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setCompraId: (id: number) => void;
  fetchCompras: () => void;
}

interface CompraDataProps {
  data: string;
  itens: Array<CompraItemSubmitData>
}

const defaultValue = {
  data: '',
  itens: []
};

export default function CompraForm({ compraId, modalOpen, setModalOpen, setCompraId, fetchCompras }: CompraFormProps) {
  const [modalItemOpen, setModalItemOpen] = useState(false);
  const [produtoId, setProdutoId] = useState(0);
  const [popAviso, setpopAviso] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [showAdicionais, setshowAdicionais] = useState(false);
  const [produtos, setProdutos] = useState<Array<ProdutosData>>([]);
  const [error, setError] = useState<{ data: null | string, itens: null | string }>({ data: null, itens: null });
  const [sucesso, setSucesso] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CompraDataProps>(defaultValue);
  const today = new Date().toISOString().split('T')[0];

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, data: value });
    setshowAdicionais(!!value);
  }

  const validData = () => {
    if (formData.data) {
      setError({ ...error, data: null });
      return true;
    } else {
      setError({ ...error, data: 'Selecione uma data' });
      return false;
    }
  }

  const validItens = () => {
    if (formData.itens.length > 0) {
      setError({ ...error, itens: null });
      return true;
    } else {
      setError({ ...error, itens: 'Adicione no mínimo um produto' });
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validData() && validItens()) {
      setIsLoading(true);

      const data: CompraDataStore = {
        com_data_compra: formatDateSave(formData.data),
        itens_compra: formData.itens.map((item) => ({
          pro_id: item.produto,
          itens_com_quantidade: item.qtde,
          itens_com_valor: item.valor
        }))
      };

      try {
        if (compraId > 0)
          await CompraService.save(compraId, data);
        else
          await CompraService.create(data);
        fetchCompras();
        setCompraId(0);
        setModalOpen(false);
      } catch (error) {
        alert('Ocorreu um erro inesperado!');
      }

      setIsLoading(false);
    }
  };

  const handleAddItem = (data: CompraItemSubmitData) => {
    const existingItemIndex = formData.itens.findIndex(item => item.produto === data.produto);
    if (existingItemIndex !== -1) {
      // Se o item já existe, atualiza a quantidade
      const updatedItens = [...formData.itens];
      updatedItens[existingItemIndex].qtde += data.qtde;
      updatedItens[existingItemIndex].valor = data.valor;
      setFormData({ ...formData, itens: updatedItens });
    } else {
      // Se o item não existe, adiciona ao array
      setFormData({ ...formData, itens: [...formData.itens, data] });
    }
  }

  const handleRemoveItem = (index: number) => {
    if (index < formData.itens.length && confirm('Deseja excluir esse item?')) {
      const updatedItens = [...formData.itens];
      updatedItens.splice(index, 1);
      setFormData({ ...formData, itens: updatedItens });
    }
  }

  const totalValor = () => {
    return formData.itens.reduce((total, item) => total + item.valor * item.qtde, 0);
  };

  const totalQtde = () => {
    return formData.itens.reduce((total, item) => total += item.qtde, 0);
  }

  const getProdutoNome = (id: number) => {
    const index = produtos.findIndex(item => item.pro_id === id);
    return index !== -1 ? produtos[index].pro_nome : null;
  }

  useEffect(() => {
    validItens();
  }, [formData.itens]);

  useEffect(() => {
    ProdutoService.getAll()
      .then(data => setProdutos(data));
  }, []);

  useEffect(() => {
    setFormData(defaultValue);
    setError({ data: null, itens: null });
    setshowAdicionais(false);
  }, [modalOpen]);

  useEffect(() => {
    if (compraId > 0) {
      CompraService.getById(compraId)
        .then((data: CompraItemData) => {
          setFormData({
            data: format(data.com_data_compra, 'yyyy-MM-dd'),
            itens: data.itens_compra.map((item) => ({
              produto: item.pro_id,
              qtde: Number(item.itens_com_quantidade),
              valor: Number(item.itens_com_valor)
            }))
          });
          setshowAdicionais(true);
        })
        .catch((err) => {
          console.log(err);
          // alert('Ocorreu um erro inesperado')
        });
    }
  }, [compraId]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="compra-data" className="label">Data da Compra *</label>
          <input type="date" id="compra-data" value={formData.data} onChange={handleChangeData} onBlur={validData} className="input input-bordered" min="2000-01-01" max={today} />
          {error?.data && <label htmlFor="data" className="text-error p-2 text-left text-sm">{error.data}</label>}
        </div>
        {showAdicionais && (
          <div className="form-control mt-4">
            <label className="label">Itens da compra: *</label>
            <div className="text-left mb-3">
              <button type="button" className="btn btn-xs btn-primary" onClick={() => setModalItemOpen(true)}><AiOutlinePlus /> Adicionar item</button>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Valor Unitário</th>
                    <th>Qtde.</th>
                    <th>Valor Total</th>
                    <th style={{ width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.itens.map((item, i) => (
                    <tr key={`table-item-${i}`}>
                      <td>{getProdutoNome(item.produto)}</td>
                      <td>R$ {formatCurrencyNumber(item.valor)}</td>
                      <td>{item.qtde}</td>
                      <td>R$ {formatCurrencyNumber(item.valor * item.qtde)}</td>
                      <td><FaTrash cursor="pointer" onClick={() => handleRemoveItem(i)} className="text-blue-300" size={16} /></td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="text-right font-bold">Total:</td>
                    <td>{totalQtde()}</td>
                    <td>R$ {formatCurrencyNumber(totalValor())}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {error?.itens && <label htmlFor="itens" className="text-error p-2 text-left text-sm">{error.itens}</label>}
          </div>
        )}
        <div className="flex justify-end">
          <div className="mt-10 mr-5 badge badge-neutral">* : Campos obrigatórios</div>
          <div className="modal-action">
            <button type="submit" className="btn">{isLoading ? 'Salvando...' : 'Salvar'}</button>
          </div>
        </div>
      </form>
      <CompraItemModal compraId={compraId} produtoId={produtoId} setProdutoId={setProdutoId} produtos={produtos} modalOpen={modalItemOpen} setModalOpen={setModalItemOpen} addItem={handleAddItem} />
    </>
  );
}