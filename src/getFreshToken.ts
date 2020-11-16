import axios from "axios";
import { constants } from "./__constants__";

export const getFreshToken = async (refreshToken: string) => {
  try {
    const data = await axios.post(
      `${constants.POD_SSO_BASE_URL}/refresh-token`,
      {
        refreshToken,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
