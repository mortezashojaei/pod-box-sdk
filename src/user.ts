import axios from 'axios';
import { getToken, isLoggedIn } from './auth';
import { constants } from './__constants__';

export const getInfo = async () => {
  if (!isLoggedIn()) {
    return null;
  }
  const token = await getToken();
  const userInfo = await axios.get(
    `${constants.POD_BASE_URL}srv/core/nzh/getUserProfile/`,
    {
      headers: {
        _token_: token,
        _token_issuer_: constants.TOKEN_ISSUER,
      },
    },
  );
  return userInfo;
};

export const user = { getInfo };
