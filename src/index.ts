import { init } from "./init";
import { getStoredData } from "./store";
import { getFreshToken } from "./getFreshToken";
import { getToken } from "./getToken";
import { getUserInfo } from "./getUserInfo";
import { handleClose } from "./handleClose";

const PodBox = {
  init,
  getStoredData,
  getFreshToken,
  getToken,
  getUserInfo,
  handleClose,
};

export default PodBox;
Object.assign(module.exports, PodBox);
