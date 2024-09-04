interface ModalProps {
    message: string;
    submessage?:string;
    onClose: () => void;
    onConfirm: boolean;
    onConfirmRemoval?: () => void; 
    setOnExcluir?: (bool: boolean) => void;
    setMenuOption: (option: string) => void;
    setModalOpen: (open: boolean) => void;
  }

const MensagemModal: React.FC<ModalProps> = ({ onConfirmRemoval, message, submessage, onClose, onConfirm, setMenuOption, setModalOpen }) => {
    return (
      <div className="modal modal-open">
        <div className="modal-box flex-row">
          <h2 className="text-xl">{message}</h2>
          {submessage && <p className="text-sm mt-5">{submessage}</p>}
          <div className="mt-10 modal-action">
            {onConfirm && <button onClick={() => setMenuOption('gerenciarPessoas')} className="btn">Confirmar</button>}
            {onConfirmRemoval && <button onClick={onConfirmRemoval} className="btn btn-error">Remover</button>}
            <button onClick={onConfirmRemoval ? () => { onClose; setModalOpen(false)} : onClose} className={onConfirmRemoval ? "btn" : "btn btn-error"} >Cancelar</button>
          </div>
        </div>
      </div>
    );
};

export default MensagemModal;