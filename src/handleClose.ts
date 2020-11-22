import { constants } from './__constants__';

export const handleClose = ({
  closeMode,
  closeMessage,
  closeAction,
}: {
  closeMode: 'success' | 'error';
  closeMessage?: string;
  closeAction?: string;
}) => {
  localStorage.removeItem(constants.STORAGE_DATA_KEY);
  location.search = `?${constants.CLOSE_MODE_KEY}=${
    closeMode || 'error'
  }${
    closeMessage && `&${constants.CLOSE_MESSAGE_KEY}=${closeMessage}`
  }${closeAction && `&${constants.CLOSE_ACTION_KEY}=${closeAction}`}`;
};
