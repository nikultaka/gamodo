import axios from "axios";
import { getLoginApiUrl } from "@/api/Endpoints/apiEndPoints";
import { Cookies } from "react-cookie";
import { getHostName } from "@/lib/functions/_common.lib";
import { setCookie } from "cookies-next";
import { throttledTriggerLogoutEvent } from "@/lib/functions/_helpers.lib";
const cookie = new Cookies();

const axiosInstance = axios.create();

let context = {};
let baseUrl = "";

let hostname = "";
export const setSiteHostName = (_hostname) => {
  hostname = _hostname;
  context?.res?.setHeader("set-cookie", [`hostname=${hostname};path=/`]);
  setCookie("hostname", hostname);
};
export const getSiteHostName = () => {
  return hostname;
};

export const setAxiosBaseUrl = (hostname, debug) => {
  if (hostname && !hostname?.includes(":")) {
    setSiteHostName(hostname);
    baseUrl = getLoginApiUrl(hostname);
    console.log("resolved host in " + debug, hostname);
  }
};

export const getAxiosBaseUrl = () => {
  return baseUrl;
};

export const getAxiosContext = () => {
  return context;
};

export const setAxiosContext = (_context) => {
  context = _context;
  if (typeof window === "undefined") {
    const hostname = getHostName(context.req?.headers?.host);
    setAxiosBaseUrl(hostname, "server");
  }
};

if (typeof window !== "undefined") {
  const resolvedHostName =
    cookie.get("hostname") || getHostName(window.location.host);
  setAxiosBaseUrl(resolvedHostName, "client");
}

axiosInstance.interceptors.request.use(
  async (config) => {
    let baseUrl = getAxiosBaseUrl();
    if (baseUrl) {
      config.baseURL = baseUrl;
      console.log("using base url", config.baseURL);
    }

    config.headers["api-key"] = process.env.NEXT_API_KEY;
    // const token = cookie.get("token");

    // if (
    //   token !== null &&
    //   token !== undefined &&
    //   !config?.headers?.["authorization"]
    // ) {
    //   config.headers["authorization"] = `Bearer ${token}`;
    // }

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
