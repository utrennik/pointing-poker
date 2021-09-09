import { Modal } from '@material-ui/core';

export const ModalWrapper = ({ isOpen, onClose, children }) => (
  <Modal open={isOpen} onClose={onClose}>
    <div className="body-modal">{children}</div>
  </Modal>
);
