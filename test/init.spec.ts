import { ConfigType, init } from '../src/init';
import { constants } from '../src/__constants__';

global.window = Object.create(window);
const href = 'http://example.com/init';
const authenticatingPage = 'http://example.com/authenticating';
const search = '?token=1&second=2&third=3';
Object.defineProperty(window, 'location', {
  value: {
    href,
    search,
  },
});

const ExampleConfig: ConfigType = {
  redirectUri: authenticatingPage,
  scope: 'profile',
  clientId: '18131280rd8074b3fa9fd5f074c63f334',
};

describe('init works correctly', () => {
  it('local storage is fill', () => {
    init(ExampleConfig);

    const store = localStorage.getItem(constants.STORAGE_DATA_KEY);
    expect(store).toContain(ExampleConfig.redirectUri);
    expect(store).toContain(ExampleConfig.clientId);
    expect(store).toContain(constants.CODE_VERIFIER_KEY);
  });

  it('local storage old values clear with init', () => {
    const TestData = "{'testKey':'test Value'}";
    localStorage.setItem(constants.STORAGE_DATA_KEY, TestData);

    init(ExampleConfig);

    expect(
      localStorage.getItem(constants.STORAGE_DATA_KEY),
    ).not.toContain(TestData);
  });
});
