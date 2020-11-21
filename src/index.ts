import { init } from './init';
import { getStoredData } from './store';
import { user } from './getUserInfo';
import { handleClose } from './handleClose';
import { auth } from './auth';

const PodBox = {
  init,
  getStoredData,
  handleClose,

  user,
  auth,
};

export default PodBox;
Object.assign(module.exports, PodBox);
