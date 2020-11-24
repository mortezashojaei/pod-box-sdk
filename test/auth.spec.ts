const axios = require('axios');
import { auth } from '../src/auth';
import { constants } from '../src/__constants__';

jest.mock('axios');

describe('isTokenExpired module works currectly', () => {
  it('return true when is expired', () => {
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({ [constants.EXPIRES_IN_KEY]: 0 }),
    );
    expect(auth.isTokenExpired()).toBe(true);
  });

  it('return false when is not expired', () => {
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({
        [constants.EXPIRES_IN_KEY]: 1000000000000000,
      }),
    );
    expect(auth.isTokenExpired()).toBe(false);
  });
});
