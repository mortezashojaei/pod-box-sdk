import { constants } from "./__constants__";

export const getStoredData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(constants.STORAGE_DATA_KEY));
    return data;
  } catch (error) {
    throw error;
  }
};
