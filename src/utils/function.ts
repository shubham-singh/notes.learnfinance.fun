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
    }, 0)
  };