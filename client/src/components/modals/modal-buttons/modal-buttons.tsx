import { Button } from '@material-ui/core';
import { IModalButtons } from '@models/types';
import './modal-buttons.sass';

export const ModalButtons = ({
  okBtnText = 'Ok',
  cancelBtnText = 'Cancel',
  onClose,
  onConfirm,
  disableConfirm,
}: IModalButtons) => (
  <div className="buttons-modal">
    <Button variant="contained" size="medium" onClick={onClose}>
      {cancelBtnText}
    </Button>
    <Button
      variant="contained"
      size="medium"
      color="primary"
      onClick={onConfirm}
      disabled={disableConfirm}
    >
      {okBtnText}
    </Button>
  </div>
);
