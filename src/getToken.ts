import { getFreshToken } from "./getFreshToken";
import { getStoredData } from "./getStoredData";
import { constants } from "./__constants__";

export const getToken = async () => {
  const store = getStoredData();
  if (store[constants.TOKEN_KEY]) {
    return store[constants.TOKEN_KEY];
  } else {
    if (store[constants.REFRESH_TOKEN_KEY]) {
      const token = await getFreshToken(store[constants.REFRESH_TOKEN_KEY]);
      return token;
    } else {
      throw new ReferenceError("Token and RefreshToken is undefinded");
    }
  }
};
