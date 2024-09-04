interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode;
}

const ItemModal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <dialog id="my_modal_4" className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Adicionar Item</h3>
                {children}
            </div>
        </dialog>
    );
}

export default ItemModal;