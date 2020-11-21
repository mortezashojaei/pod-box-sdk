import axios from "axios";
import { addNewItemToStore, getStoredData } from "./store";
import { constants } from "./__constants__";

export const getFreshToken = async (refresh_token: string) => {
  try {
    const code_verifier = getStoredData()[constants.CODE_VERIFIER_KEY];
    if (code_verifier) {
      const data = await axios.post(
        `${constants.POD_AUTH_BASE_URL}/oauth2/token`,
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            refresh_token,
            code_verifier,

            grant_type: "refresh_token",
            client_id: constants.CLIENT_ID,
          },
        }
      );
      return data.data;
    } else {
      throw ReferenceError("There is no code verifier");
    }
  } catch (error) {
    throw error;
  }
};

export const getToken = async () => {
  const store = getStoredData();
  if (store[constants.TOKEN_KEY]) {
    return store[constants.TOKEN_KEY];
  } else {
    if (store[constants.REFRESH_TOKEN_KEY]) {
      const data: {
        access_token: string;
      } = await getFreshToken(store[constants.REFRESH_TOKEN_KEY]);
      addNewItemToStore({ key: constants.TOKEN_KEY, value: data.access_token });
      return data.access_token;
    } else {
      throw new ReferenceError("Token and RefreshToken is undefinded");
    }
  }
};

export const handleAuthenticatingPage = async () => {
  let params = new URL(window.location.href).searchParams;
  const code = params.get("code");
  const { data }: { data: { access_token: string } } = await axios.post(
    `${constants.POD_AUTH_BASE_URL}/oauth2/token`,
    null,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        code_verifier: getStoredData()[constants.CODE_VERIFIER_KEY],
        code,
        grant_type: "authorization_code",
        client_id: constants.CLIENT_ID,
        redirect_uri: getStoredData()[constants.REDIRECT_URL_KEY],
      },
    }
  );

  addNewItemToStore({ key: constants.TOKEN_KEY, value: data.access_token });
};

export async function authInit(config: ConfigType) {
  const codeVerifier = generateRandomString();
  addNewItemToStore({ key: constants.CODE_VERIFIER_KEY, value: codeVerifier });
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
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function generateCodeChallenge(codeVerifier) {
  var digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export const isLoggedIn =
  getStoredData() &&
  getStoredData()[constants.TOKEN_KEY] &&
  getStoredData()[constants.REFRESH_TOKEN_KEY];

export const auth = {
  getFreshToken,
  getToken,
  handleAuthenticatingPage,
  isLoggedIn,
};
