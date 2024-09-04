import { adicionarUmDia } from "@/services/doacao/utils";
import FisicaService, { FisicaOut } from "@/services/fisica";
import { formataCPF, formataTelefone } from "@/services/fisica/utils";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

interface FisicaCardProps {
  setCardOpen: (open: boolean) => boolean | void;
  pessoaId: number;
  cardOpen: boolean;
}

enum Genero {
  Masculino = 1,
  Feminino = 2,
  Outro = 3,
}

const FisicaCard: React.FC<FisicaCardProps> = ({ pessoaId, setCardOpen, cardOpen }) => {
  const [pessoa, setPessoa] = useState<FisicaOut>();
  const [loading, setLoading] = useState(true);

  const closeModalCard = (event) => {
    event.preventDefault();
    setCardOpen(false);
};


  useEffect(() => {
    if (pessoaId > 0 && cardOpen) {
      fetchFisica();
    }
  }, [pessoaId, cardOpen]);


  const fetchFisica = async () => {
    setLoading(true);
    const data = await FisicaService.getFisicaById(pessoaId);
    setPessoa(data!);
    setLoading(false);
  };

  const getGenero = (id: number): string => {
    return Genero[id] || "Não especificado";
  };

  return (
    <div className="card card-compact w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-base-100 shadow-xl">
      <figure className="p-4">
        <img
          src="https://krit.com.br/wp-content/uploads/2023/08/icone-pessoa-fisica.png"
          alt="Pessoa Física"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-center text-2xl font-bold mb-4">Ficha de cadastro</h2>
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          pessoa && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Nome:</span>
                <span>{pessoa.pes_nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">CPF:</span>
                <span>{formataCPF(pessoa.fis_cpf)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">RG:</span>
                <span>{pessoa.fis_rg}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{pessoa.pes_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Telefone:</span>
                <span>{formataTelefone(pessoa.pes_telefone)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Gênero:</span>
                <span>{getGenero(pessoa.sex_id)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Data de Nascimento:</span>
                <span>{format(adicionarUmDia(pessoa.fis_data_nascimento), 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Endereço:</span>
                <span>{`${pessoa.pes_logradouro}, ${pessoa.pes_numero} - ${pessoa.pes_bairro}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Complemento:</span>
                <span>{pessoa.pes_complemento}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Cidade:</span>
                <span>{pessoa.cid_nome + " - " + pessoa.est_sigla}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span>{pessoa.pes_status ? 'Ativo' : 'Inativo'}</span>
              </div>
            </div>
          )
        )}
        <div className="card-actions mt-4 justify-end">
          <button className="btn btn-outline btn-info" onClick={closeModalCard}>Voltar</button>
        </div>
      </div>
    </div>
  );
};

export default FisicaCard;
