import { init } from "../src/init";
import { constants } from "../src/__constants__";

global.window = Object.create(window);
const href = "http://example.com/";
const search = "?token=1&second=2&third=3";
Object.defineProperty(window, "location", {
  value: {
    href,
    search,
  },
});

describe("init works correctly", () => {
  init();
  it("local storage is fill", () => {
    expect(localStorage.getItem(constants.STORAGE_DATA_KEY)).toBe(
      '{"token":"1"}'
    );
  });
});
