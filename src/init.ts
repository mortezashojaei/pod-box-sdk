import { constants } from "./__constants__";

export const init = () => {
  try {
    localStorage.setItem(constants.STORAGE_DATA_KEY, JSON.stringify(queryStringToJSON()));
    console.log("________PODBOX INITIALIZED SUCCESSFULLY !________");
  } catch (error) {
    console.log("ERROR IN PODBOX INIT", error);
  }
};

function queryStringToJSON() {
  const qs = location.search.slice(1);

  let pairs = qs.split("&");
  let result = {};
  pairs.forEach(function (p) {
    let pair = p.split("=");
    let key = pair[0];
    let value = decodeURIComponent(pair[1] || "");

    if (key !== "") {
      if (result[key]) {
        if (Object.prototype.toString.call(result[key]) === "[object Array]") {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    }
  });

  return JSON.parse(JSON.stringify(result));
}
