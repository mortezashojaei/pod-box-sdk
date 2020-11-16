import axios from "axios";
import { getToken } from "./getToken";
import { constants } from "./__constants__";

export const getUserInfo = async () => {
  const token = await getToken();
  const userInfo = await axios.get(
    `${constants.POD_BASE_URL}/nzh/getUserProfile/`,
    {
      headers: {
        _token_: token,
        _token_issuer_: constants.TOKEN_ISSUER,
      },
    }
  );
  return userInfo;
};
