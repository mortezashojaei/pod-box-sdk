import { constants, paramTypes } from './__constants__';

export const getStoredData = () => {
  try {
    const data = JSON.parse(
      localStorage.getItem(constants.STORAGE_DATA_KEY),
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const addNewItemToStore = ({
  key,
  value,
}: {
  key: string;
  value: any;
}) => {
  if (paramTypes.includes(key)) {
    localStorage.setItem(
      constants.STORAGE_DATA_KEY,
      JSON.stringify({
        ...getStoredData(),
        [key]: value,
      }),
    );
  } else {
    throw Error;
  }
};
