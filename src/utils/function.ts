import axios from "axios";

export const setupAuthHeaderForServiceCalls = () => {
  const token = JSON.parse(localStorage.getItem("auth_learnfinance") as string);
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const deleteAuthToken = () => {
  localStorage.removeItem("auth_learnfinance");
  setTimeout(() => {
    window.location.reload();
  }, 0);
};

export function isObject(object: object) {
  return object != null && typeof object === "object";
}

export function deepEqual(object1: any, object2: any) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}
