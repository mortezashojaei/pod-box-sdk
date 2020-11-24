const axios = require('axios');
import { auth } from '../src/auth';
import { getStoredData } from '../src/store';
import { constants } from '../src/__constants__';

jest.mock('axios');

describe('isTokenExpired module works currectly', () => {
  it('return true when is expired', () => {
    window.localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({ [constants.EXPIRES_IN_KEY]: 0 }),
    );
    expect(auth.isTokenExpired()).toBe(true);
  });

  it('return false when is not expired', () => {
    window.localStorage.setItem(
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

describe('isLoggedIn works correctly', () => {
  it('return false when user is not logged in', () => {
    window.localStorage.removeItem(constants.STORAGE_DATA_KEY);
    expect(auth.isLoggedIn()).toBe(false);
  });

  it('when there is not expired token and refresh Token => user logged in', () => {
    //user is logged in so has token,refresh token,and token is not expired
    window.localStorage.setItem(
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

describe('refreshToken module works correctly', () => {
  const access_token = 'token',
    expires_in = 1,
    refresh_token = 'refresh token';
  axios.post.mockResolvedValue({
    data: {
      access_token,
      refresh_token,
      expires_in,
    },
  });

  it('Error when PodBox isnot init correctly', async () => {
    window.localStorage.removeItem(constants.STORAGE_DATA_KEY);
    await expect(auth.refreshToken('test')).rejects.toThrow(
      TypeError,
    );
  });

  it('refresh token corectly when all requirements is defined', async () => {
    // supposed to : PodBox inited
    window.localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({
        [constants.CODE_VERIFIER_KEY]: 'test',
        [constants.CLIENT_ID_KEY]: 'test',
      }),
    );
    const result = await auth.refreshToken('test');
    expect(result).toBe(access_token);
  });
});

describe('getToken module works correctly', () => {
  it('Error when PodBox is not inited correctly', async () => {
    window.localStorage.removeItem(constants.STORAGE_DATA_KEY);
    await expect(auth.getToken()).rejects.toThrow(ReferenceError);
  });
  it('get token when stored token is expired', async () => {
    const access_token = 'token',
      expires_in = 1,
      refresh_token = 'refresh token';
    axios.post.mockResolvedValue({
      data: {
        access_token,
        refresh_token,
        expires_in,
      },
    });

    window.localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({
        [constants.EXPIRES_IN_KEY]: 0,
        [constants.TOKEN_KEY]: access_token,
        [constants.REFRESH_TOKEN_KEY]: refresh_token,
        [constants.CODE_VERIFIER_KEY]: 'test',
        [constants.CLIENT_ID_KEY]: 'test',
      }),
    );

    const result = await auth.getToken();
    expect(result).toBe(access_token);
  });
});

describe('handleAuthenticatingPage works corecctly', () => {
  it('thro error when there is no code', async () => {
    window.localStorage.removeItem(constants.STORAGE_DATA_KEY);
    await expect(auth.handleAuthenticatingPage()).rejects.toThrow(
      ReferenceError,
    );
  });

  it('handle authentication page when there is code and PodBox is inited', async () => {
    window.history.pushState(
      {},
      'authenticating',
      '/authenticating?code=testcode',
    );
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({
        [constants.CODE_VERIFIER_KEY]: 'test',
        [constants.CLIENT_ID_KEY]: 'test',
        [constants.REDIRECT_URL_KEY]: 'test',
      }),
    );

    const access_token = 'token',
      expires_in = 1,
      refresh_token = 'refresh token';
    axios.post.mockResolvedValue({
      data: {
        access_token,
        refresh_token,
        expires_in,
      },
    });

    await auth.handleAuthenticatingPage();
    expect(getStoredData()[constants.TOKEN_KEY]).toBe(
      access_token,
    );
  });
});
