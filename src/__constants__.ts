export const constants = {
  POD_BASE_URL: 'https://api.pod.ir/',
  POD_AUTH_BASE_URL: 'https://accounts.pod.ir/',
  STORAGE_DATA_KEY: 'POD_BOX_DATA',
  TOKEN_ISSUER: '1',
  TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  EXPIRES_IN_KEY: 'expires_in',
  CODE_VERIFIER_KEY: 'code_verifier',
  CLIENT_ID_KEY: 'client_id',
  CLOSE_MODE_KEY: 'closeMode',
  CLOSE_MESSAGE_KEY: 'closeMessage',
  CLOSE_ACTION_KEY: 'closeAction',
  REDIRECT_URL_KEY: 'redirect_url',
};

export const paramTypes = [
  constants.TOKEN_KEY,
  constants.REFRESH_TOKEN_KEY,
  constants.CLIENT_ID_KEY,
  constants.CODE_VERIFIER_KEY,
  constants.CLOSE_MODE_KEY,
  constants.CLOSE_MESSAGE_KEY,
  constants.CLOSE_ACTION_KEY,
  constants.REDIRECT_URL_KEY,
  constants.EXPIRES_IN_KEY,
];
