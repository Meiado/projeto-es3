import React from "react";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode;
}

const DoacaoModal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <dialog id="my_modal_4" className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box h-full max-w-5xl">
            {children}
        </div>
        </dialog>
    );
};

export default DoacaoModal;