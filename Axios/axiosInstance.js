import axios from "axios";
import { baseURL } from "@/api/Endpoints/apiEndPoints";
import { throttledTriggerLogoutEvent } from "@/lib/functions/_helpers.lib";
// import { Cookies } from "react-cookie";
// const cookie = new Cookies();

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = cookie.get("token");
    // if (token !== null && token !== undefined) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }

    config.headers["private_key"] =
      config?.headers?.["private_key"] ?? process.env.NEXT_PRIVATE_KEY;

    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error?.response?.status === 498) {
      throttledTriggerLogoutEvent();
    }
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
