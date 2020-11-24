import axios from 'axios';
import { addNewItemToStore, getStoredData } from './store';
import { constants } from './__constants__';
import { ConfigType } from './init';

export type TokenResultType = {
  data: {
    expires_in: number;
    access_token: string;
    refresh_token: string;
  };
};

export const refreshToken = async (refresh_token: string) => {
  try {
    const code_verifier = getStoredData()[
      constants.CODE_VERIFIER_KEY
    ];
    const client_id = getStoredData()[constants.CLIENT_ID_KEY];

    if (code_verifier && client_id) {
      const data: TokenResultType = await axios.post(
        `${constants.POD_AUTH_BASE_URL}/oauth2/token`,
        null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            refresh_token,
            code_verifier,

            grant_type: 'refresh_token',
            client_id,
          },
        },
      );
      setSession(data);
      return data.data.access_token;
    } else {
      throw ReferenceError('There is no code verifier or client id');
    }
  } catch (error) {
    throw error;
  }
};

export const getToken = async () => {
  const store = getStoredData();
  if (store && store[constants.TOKEN_KEY] && !isTokenExpired()) {
    return store[constants.TOKEN_KEY];
  } else {
    if (store && store[constants.REFRESH_TOKEN_KEY]) {
      const access_token = await refreshToken(
        store[constants.REFRESH_TOKEN_KEY],
      );

      return access_token;
    } else {
      throw ReferenceError('Token and RefreshToken is undefinded');
    }
  }
};

export const handleAuthenticatingPage = async (
  onSuccess?: () => void,
  onError?: () => void,
) => {
  try {
    let params = new URL(window.location.href).searchParams;
    const code = params.get('code');
    if (code) {
      const data: TokenResultType = await axios.post(
        `${constants.POD_AUTH_BASE_URL}/oauth2/token`,
        null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            code_verifier: getStoredData()[
              constants.CODE_VERIFIER_KEY
            ],
            code,
            grant_type: 'authorization_code',
            client_id: getStoredData()[constants.CLIENT_ID_KEY],
            redirect_uri: getStoredData()[constants.REDIRECT_URL_KEY],
          },
        },
      );
      setSession(data);
      if (onSuccess) onSuccess();
    } else {
      throw ReferenceError('there is no code');
    }
  } catch (error) {
    if (onError) onError();
    throw error;
  }
};

export async function authInit(config: ConfigType) {
  const codeVerifier = generateRandomString();
  addNewItemToStore({
    key: constants.CODE_VERIFIER_KEY,
    value: codeVerifier,
  });
  addNewItemToStore({
    key: constants.CLIENT_ID_KEY,
    value: config.clientId,
  });
  addNewItemToStore({
    key: constants.REDIRECT_URL_KEY,
    value: config.redirectUri,
  });
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  location.href = getAuthorizeUrl({
    ...config,
    codeChallenge,
  });
}

function getAuthorizeUrl({
  clientId,
  redirectUri,
  scope,

  codeChallenge,
}: {
  clientId: string;
  redirectUri: string;
  scope: string;
  codeChallenge: string;
}) {
  return `${constants.POD_AUTH_BASE_URL}oauth2/authorize/index.html?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${scope}&prompt=none`;
}

function generateRandomString() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 10; i++) {
    text += possible.charAt(
      Math.floor(Math.random() * possible.length),
    );
  }

  return text;
}

async function generateCodeChallenge(codeVerifier) {
  var digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier),
  );

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export const isLoggedIn = () =>
  Boolean(
    getStoredData() &&
      getStoredData()[constants.TOKEN_KEY] &&
      getStoredData()[constants.REFRESH_TOKEN_KEY] &&
      !isTokenExpired(),
  );

const getCurrentDateInSeconds = () => Math.floor(Date.now() / 1000);

const setSession = ({ data }: TokenResultType) => {
  const { access_token, expires_in, refresh_token } = data;

  addNewItemToStore({
    key: constants.TOKEN_KEY,
    value: access_token,
  });

  addNewItemToStore({
    key: constants.REFRESH_TOKEN_KEY,
    value: refresh_token,
  });

  addNewItemToStore({
    key: constants.EXPIRES_IN_KEY,
    value: getCurrentDateInSeconds() + expires_in,
  });
};

const isTokenExpired = () =>
  getCurrentDateInSeconds() >
  getStoredData()[constants.EXPIRES_IN_KEY] - 20;
export const auth = {
  refreshToken,
  getToken,
  handleAuthenticatingPage,
  isLoggedIn,
  isTokenExpired,
  setSession,
};
