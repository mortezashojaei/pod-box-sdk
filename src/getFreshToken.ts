import axios from "axios";
import { getStoredData } from "./store";
import { constants } from "./__constants__";

export const getFreshToken = async (refresh_token) => {
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
      throw TypeError;
    }
  } catch (error) {
    throw error;
  }
};
