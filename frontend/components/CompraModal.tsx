import React from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

export default function CompraModal({ modalOpen, setModalOpen, children }: ModalProps) {
  return (
    <dialog id="my_modal_4" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box h-full w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Informações</h3>
        {children}
      </div>
    </dialog>
  )
}
