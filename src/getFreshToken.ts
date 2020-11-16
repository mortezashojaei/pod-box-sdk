import axios from "axios";
import { constants } from "./__constants__";

export const getFreshToken = async ({
  refresh_token,
  code_verifier,
}: {
  refresh_token: string;
  code_verifier: string;
}) => {
  try {
    const data = await axios.post(
      `${constants.POD_SSO_BASE_URL}/oauth2/token`,
      {
        refresh_token,
        code_verifier,

        grant_type: "refresh_token",
        client_id: constants.CLIENT_ID,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
