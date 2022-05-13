const axios = require("axios");
const JsFileDownloader = require("js-file-downloader");
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/",
});
/*axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 422:
        return Promise.reject({
          ack: 0,
          message: "Repeated or invalid credentials!",
        });
      case 401:
        if (Cookies.get("userToken")) {
          Cookies.remove("userToken");
          localStorage.removeItem();
        }
        window.location.replace("/login");
        return Promise.reject({
          ack: 0,
          message: "Not Authorized!",
        });
      case 403:
        if (Cookies.get("userToken")) {
          Cookies.remove("userToken");
          localStorage.removeItem();
        }
        window.location.replace("/login");
        alert("Please verify your email first!");
        return Promise.reject({
          ack: 0,
          message: "Email not verified!",
        });
      default:
        return Promise.reject({ ack: 0, message: error.response.statusText });
    }
  }
);*/
export const loginReq = async (reqOBJ) => {
  try {
    const res = await axiosInstance.post("login", reqOBJ);
    return res;
  } catch (err) {
    return err;
  }
};
export const registerReq = async (reqOBJ) => {
  try {
    const res = await axiosInstance.post("register", reqOBJ);
    return res;
  } catch (err) {
    return err;
  }
};

export const usernameHeaderReq = async () => {
  try {
    const res = await axiosInstance.get("login");

    return res;
  } catch (err) {
    return err;
  }
};
export const checkAuthReq = async () => {
  try {
    const res = await axiosInstance.get("isUserAuth");
    return res;
  } catch (err) {
    return err;
  }
};
export const logoutReq = async () => {
  try {
    const res = await axiosInstance.get("logout");
    return res;
  } catch (err) {
    return err;
  }
};
export const fileUploadReq = async (reqObj) => {
  try {
    const res = await axiosInstance.post("file/upload", reqObj);
    return res;
  } catch (err) {
    return err;
  }
};
export const getUserFiles = async () => {
  try {
    const res = await axiosInstance.get("getUserFiles");
    return res;
  } catch (err) {
    return err;
  }
};
export const getFile = async (filename) => {
  try {
    return new JsFileDownloader({
      url: axiosInstance.defaults.baseURL + "download?filename=" + filename,
      withCredentials: true,
      filename: filename,
    });
  } catch (err) {
    return err;
  }
};
