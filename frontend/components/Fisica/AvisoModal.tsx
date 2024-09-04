import React from "react";

interface AvisoModalProps {
    popAviso:  boolean;
    setpopAviso: (open: boolean) => boolean | void;
    mensagem: string;
    setMensagem: (mes: string) => string | void;
    sucesso: boolean; // Nova propriedade para indicar o sucesso do envio
    setModalOpen: (open: boolean) => void;
    pessoaId: number;
    setPessoaId: (id: number) => void;
    fetchFisicas: () => void;
}

const AvisoModal: React.FC<AvisoModalProps> = ({ popAviso, setpopAviso, mensagem, setMensagem, sucesso, setModalOpen, pessoaId, setPessoaId, fetchFisicas }) => {
    const handleVoltarClick = () => {
        setpopAviso(false);
        setMensagem("");
        if(sucesso) {
            setPessoaId(0);
            setModalOpen(false);
            fetchFisicas();
        }
        return false; // Isso evita que o formulário seja submetido
    }

    return (
        <dialog id="my_modal_1" className={`modal ${popAviso ? "modal-open" : ""} ${sucesso ? "modal-success" : ""}`}> {/* Adiciona a classe 'modal-success' se sucesso for verdadeiro */}
            <div className="modal-box">
                <h3 className={`font-bold text-lg ${sucesso ? "text-green-500" : "text-red-500"}`}>{sucesso ? "Sucesso!" : "Confira os dados!"}</h3> {/* Altera o título com base no sucesso */}
                <p className="py-4">{mensagem}</p>
                <div className="modal-action">
                    <button className="btn" onClick={handleVoltarClick}>Voltar</button>
                </div>
            </div>
        </dialog>
    );
};

export default AvisoModal;
