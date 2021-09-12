import { Modal } from '@material-ui/core';
import { IModalWrapper } from '@models/types';
import { ModalButtons } from '../modal-buttons/modal-buttons.tsx';

export const ModalWrapper = ({ isOpen, onClose, onConfirm, title, children }: IModalWrapper) => (
  <Modal open={isOpen} onClose={onClose}>
    <div className="body-modal">
      <h2 className="header-modal">{title}</h2>
      {children}
      <ModalButtons okBtnText="Confirm" onClose={onClose} onConfirm={onConfirm} />
    </div>
  </Modal>
);
