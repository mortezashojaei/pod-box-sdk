import { getStoredData, addNewItemToStore } from '../src/store';
import { constants } from '../src/__constants__';

describe('getStoredData module works correctly', () => {
  it('return null when there is no data in store', () => {
    expect(getStoredData()).toBe(null);
  });
  it('trow syntax error when data is not Json', () => {
    localStorage.setItem(constants.STORAGE_DATA_KEY, 'I am not Json');
    expect(() => getStoredData()).toThrow(SyntaxError);
  });
  it('return object when there is a JSON in localstorage', () => {
    const TestObject = {
      name: 'test',
    };
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify(TestObject),
    );
    expect(getStoredData()).toEqual(TestObject);
  });
});

describe('addNewItemToStore module works correctly', () => {
  it('add new value (valid key)', () => {
    const TestValue = 'test';
    addNewItemToStore({
      key: constants.TOKEN_KEY,
      value: TestValue,
    });
    expect(getStoredData()[constants.TOKEN_KEY]).toEqual(TestValue);
  });
  it('dont let any key to add in store', () => {
    const TestKey = 'test';

    expect(() => {
      addNewItemToStore({ key: TestKey, value: 'any thing' });
    }).toThrowError();
  });
});
