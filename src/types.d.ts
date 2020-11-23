export type ConfigType = {
  clientId: string;
  redirectUri: string;
  scope: string;
};

export type TokenResultType = {
  data: {
    expires_in: number;
    access_token: string;
    refresh_token: string;
  };
};
