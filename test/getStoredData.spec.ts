import { getStoredData } from '../src/store';
import { constants } from '../src/__constants__';

describe('getStoredData module works correctly', () => {
  it('return null when there is no data in store', () => {
    expect(getStoredData()).toBe(null);
  });
  it('trow syntax error when data is not Json', () => {
    localStorage.setItem(constants.STORAGE_DATA_KEY, 'I am not Json');
    expect(() => getStoredData()).toThrow(SyntaxError);
  });
  it('return object when there is a JSON on localstorage', () => {
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      "{'name':'test'}",
    );
    expect(() => getStoredData()).toThrow(SyntaxError);
  });
});
