import axios from "axios";
import { constants } from "./__constants__";

export const getFreshToken = async (refresh_token: string) => {
  try {
    const code_verifier = generateCodeVerifier(10);
    const code_challenge = await generateCodeChallenge(code_verifier);
    const data = await axios.post(
      `${constants.POD_SSO_BASE_URL}/oauth2/token`,
      {
        refresh_token,
        grant_type: "refresh_token",
        client_id: constants.CLIENT_ID,
        code_verifier,
        code_challenge,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

function generateCodeVerifier(length: number) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  var digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
