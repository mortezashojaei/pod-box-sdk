const axios = require('axios');
import { auth } from '../src/auth';
import { getStoredData } from '../src/store';
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

describe('setSession module works correctly', () => {
  it('session values is in store', () => {
    const access_token = 'token',
      expires_in = 1,
      refresh_token = 'refresh token';
    auth.setSession({
      data: { access_token, expires_in, refresh_token },
    });
    expect(getStoredData()[constants.TOKEN_KEY]).toBe(access_token);
    expect(getStoredData()[constants.REFRESH_TOKEN_KEY]).toBe(
      refresh_token,
    );
    expect(getStoredData()[constants.EXPIRES_IN_KEY]).toBeDefined();
  });
});

describe('is Logged in works correctly', () => {
  it('return false when user is not logged in', () => {
    expect(auth.isLoggedIn()).toBe(false);
  });

  it('when there is not expired token and refresh Token => user logged in', () => {
    //user is logged in so has token,refresh token,and token is not expired
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({
        [constants.TOKEN_KEY]: 'token',
        [constants.REFRESH_TOKEN_KEY]: 'refresh token',
        [constants.EXPIRES_IN_KEY]: 1000000000000000,
      }),
    );

    expect(auth.isLoggedIn()).toBe(true);
  });
});
