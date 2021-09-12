import { Button } from '@material-ui/core';
import { IModalButtons } from '@models/types';
import './modal-buttons.sass';

export const ModalButtons = ({
  okBtnText = 'Ok',
  cancelBtnText = 'Cancel',
  onClose,
  onConfirm,
}: IModalButtons) => (
  <div className="buttons-modal">
    <Button variant="contained" size="medium" onClick={onClose}>
      {cancelBtnText}
    </Button>
    <Button variant="contained" size="medium" color="primary" onClick={onConfirm}>
      {okBtnText}
    </Button>
  </div>
);
