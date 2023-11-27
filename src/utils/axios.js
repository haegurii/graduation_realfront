import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY;
const axiousInstance = axios.create({
  // baseURL: import.meta.env.RPOD ? "" : "http://localhost:4000",
  // baseURL: import.meta.env.RPOD ? "" : "http://192.168.35.213:4000",
  // baseURL:
  //   process.env.NODE_ENV === "production" ? "" : "http://192.168.219.100:4000",
  baseURL: process.env.NODE_ENV === "production" ? "" : API_KEY + ":4000",
});
axiousInstance.interceptors.request.use(
  function (config) {
    //요청 보내지기전에 수정 여서 함ㅕ 댐

    config.headers.Authorization =
      "bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiousInstance.interceptors.response.use(
  function (response) {
    //요청 보내지기전에 수정 여서 함ㅕ 댐
    return response;
  },
  function (error) {
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiousInstance;
