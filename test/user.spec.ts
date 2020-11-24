const axios = require('axios');

import { user } from '../src/user';
import { constants } from '../src/__constants__';

jest.mock('axios');

describe('user getInfo works correctly', () => {
  const mockUser = { name: 'Jhon', lastName: 'Doe' };
  axios.get.mockResolvedValue(mockUser);

  it('return null when user is not logged in', async () => {
    const userData = await user.getInfo();
    expect(userData).toEqual(null);
  });

  it('return user when user is logged in', async () => {
    //user is logged in so has token,refresh token,and token is not expired
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({
        [constants.TOKEN_KEY]: 'token',
        [constants.REFRESH_TOKEN_KEY]: 'refresh token',
        [constants.EXPIRES_IN_KEY]: 1000000000000000,
      }),
    );
    const userData = await user.getInfo();
    expect(userData).toEqual(mockUser);
  });
});
