import { init } from "./init";
import { getStoredData } from "./getStoredData";
import { getFreshToken } from "./getFreshToken";
import { getToken } from "./getToken";

const PodBox = {
  init,
  getStoredData,
  getFreshToken,
  getToken,
};

export default PodBox;
Object.assign(module.exports, PodBox);
