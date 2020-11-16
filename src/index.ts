import { init } from "./init";
import { getStoredData } from "./getStoredData";
import { getFreshToken } from "./getFreshToken";

const PodBox = {
  init,
  getStoredData,
  getFreshToken,
};

export default PodBox;
Object.assign(module.exports, PodBox);
