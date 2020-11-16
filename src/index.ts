import { init } from "./init";
import { getStoredData } from "./getStoredData";
import { getFreshToken } from "./getFreshToken";
import { getToken } from "./getToken";
import { getUserInfo } from "./getUserInfo";

const PodBox = {
  init,
  getStoredData,
  getFreshToken,
  getToken,
  getUserInfo,
};

export default PodBox;
Object.assign(module.exports, PodBox);
