import { handleClose } from '../src/handleClose';
import { constants } from '../src/__constants__';

describe('handleClose module works correctly', () => {
  it('clear store when web component closed', () => {
    localStorage.setItem(constants.STORAGE_DATA_KEY, 'test data');
    handleClose({ closeMode: 'error' });
    expect(localStorage.getItem(constants.STORAGE_DATA_KEY)).toBe(
      null,
    );
  });
  it('set close parameters in url param correctly', () => {
    const closeMode = 'success';
    const closeMessage = 'test message';
    const closeAction = 'test action';
    handleClose({
      closeMode,
      closeMessage,
      closeAction,
    });
    let params = new URL(window.location.href).searchParams;
    expect(params.get(constants.CLOSE_MODE_KEY)).toEqual(closeMode);
    expect(params.get(constants.CLOSE_MESSAGE_KEY)).toEqual(
      closeMessage,
    );
    expect(params.get(constants.CLOSE_ACTION_KEY)).toEqual(
      closeAction,
    );
  });

  it('closeMessage and closeAction can be empty', () => {
    const closeMode = 'success';
    handleClose({
      closeMode,
    });
    expect(window.location.search).toEqual(
      `?${constants.CLOSE_MODE_KEY}=${closeMode}`,
    );
  });
});
