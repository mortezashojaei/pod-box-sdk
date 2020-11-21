type ConfigType = {
  clientId: string;
  redirectUri: string;
  scope: string;
};

type TokenResultType = {
  data: {
    expires_in: number;
    access_token: string;
    refresh_token: string;
  };
};
