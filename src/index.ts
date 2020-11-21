import { init } from "./init";
import { getStoredData } from "./store";
import { getUserInfo } from "./getUserInfo";
import { handleClose } from "./handleClose";
import { auth } from "./auth";

const PodBox = {
  init,
  getStoredData,
  getUserInfo,
  handleClose,
  auth,
};

export default PodBox;
Object.assign(module.exports, PodBox);
