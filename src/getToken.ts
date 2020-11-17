import { getFreshToken } from "./getFreshToken";
import { addNewItemToStore, getStoredData } from "./store";
import { constants } from "./__constants__";

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
