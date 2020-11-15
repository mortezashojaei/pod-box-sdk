import { init } from "./init";
import { getStoredData } from "./getStoredData";

const PodBox = {
  init,
  getStoredData,
};

export default PodBox;
Object.assign(module.exports, PodBox);
