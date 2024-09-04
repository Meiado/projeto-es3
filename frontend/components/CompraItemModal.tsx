import { formatCurrency } from "@/services/fisica/utils";
import { ProdutosData } from "@/services/produto";
import React, { HtmlHTMLAttributes, useEffect, useState } from "react";

export interface CompraItemSubmitData {
  produto: number;
  qtde: number;
  valor: number;
}

interface CompraItemModalProps {
  modalOpen: boolean;
  compraId: number;
  produtoId: number;
  setProdutoId: (id: number) => void;
  setModalOpen: (open: boolean) => void;
  addItem: (data: CompraItemSubmitData) => void;
  produtos: Array<ProdutosData>
}

const defaultValues = {
  produto: 0,
  qtde: 1,
  valor: ''
};

export default function CompraItemModal({ modalOpen, compraId, produtoId, addItem, setModalOpen, setProdutoId, produtos }: CompraItemModalProps) {
  const [error, setError] = useState<{ produto: null | string, qtde: null | string, valor: null | string }>({ produto: null, qtde: null, valor: null });
  const [formData, setFormData] = useState(defaultValues);

  const handleChangeProduto = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const numericValue = Number(value);
    setFormData({ ...formData, produto: numericValue ? numericValue : 0 });
  }

  const handleChangeQtde = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = Number(value.replace(/\D/g, '')); // \D corresponde a não dígitos
    setFormData({ ...formData, qtde: numericValue });
  }

  const handleChangeValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatCurrency(value);
    setFormData({ ...formData, valor: formattedValue });
  }

  const validProduto = () => {
    const produto = formData.produto;
    if (produto > 0) {
      setError({ ...error, produto: null });
      return true;
    } else {
      setError({ ...error, produto: 'Selecione um produto' });
      return false;
    }
  }

  const validQtde = () => {
    const qtde = Number(formData.qtde);
    if (qtde >= 1) {
      setError({ ...error, qtde: null });
      return true;
    } else {
      setError({ ...error, qtde: 'A quantidade precisa ser no mínimo 1' });
      return false;
    }
  }

  const validValor = () => {
    const valor = Number(formData.valor.replace('.', '').replace(',', '.'));
    if (valor >= 0.01) {
      setError({ ...error, valor: null });
      return true;
    } else {
      setError({ ...error, valor: 'O valor precisa ser pelo menos 0,01' });
      return false;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validProduto() && validQtde() && validValor()) {
      const valor = Number(formData.valor.replace('.', '').replace(',', '.'));
      let dataSubmit: CompraItemSubmitData = {
        produto: formData.produto,
        qtde: formData.qtde,
        valor: valor
      };
      addItem(dataSubmit);
      setModalOpen(false);
    }
  }

  useEffect(() => {
    setFormData(defaultValues);
    setError({ produto: null, qtde: null, valor: null });
  }, [modalOpen]);

  return (
    <dialog id="my_modal_5" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-5xl">
        <button onClick={() => { setModalOpen(false); setProdutoId(0) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="produto" className="label">Produto *</label>
            <select id="produto" value={formData.produto} onChange={handleChangeProduto} onBlur={validProduto} className="select select-bordered" required>
              <option value="">Selecione um produto</option>
              {produtos && produtos.map((produto, i) => (
                <option key={`produto-${i}`} value={produto.pro_id}>{produto.pro_nome}</option>
              ))}
            </select>
            {error?.produto && <label htmlFor="produto" className="text-error p-2 text-left text-sm">{error.produto}</label>}
          </div>
          <div className="flex flex-col md:flex-row gap-5 mt-3">
            <div className="flex-1">
              <div className="form-control">
                <label htmlFor="qtde" className="label">Quantidade *</label>
                <input type="text" id="qtde" className="input input-bordered" onChange={handleChangeQtde} onBlur={validQtde} value={formData.qtde} min={1} required />
                {error?.qtde && <label htmlFor="qtde" className="text-error p-2 text-left text-sm">{error.qtde}</label>}
              </div>
            </div>
            <div className="flex-1">
              <div className="form-control">
                <label htmlFor="valor" className="label">Valor *</label>
                <input type="text" id="valor" className="input input-bordered" onChange={handleChangeValor} onBlur={validValor} value={formData.valor} required />
                {error?.valor && <label htmlFor="valor" className="text-error p-2 text-left text-sm">{error.valor}</label>}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="mt-10 mr-5 badge badge-neutral">* : Campos obrigatórios</div>
            <div className="modal-action">
              <button type="submit" className="btn">Adicionar</button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}