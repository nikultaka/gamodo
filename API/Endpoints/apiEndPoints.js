import { defaultHostName } from "@/lib/functions/_common.lib";
import { getCookieClient } from "@/lib/functions/_storage.lib";

export const getLoginApiUrl = (hostname) => {
  if (
    !hostname ||
    hostname === "undefined" ||
    typeof hostname === "undefined"
  ) {
    hostname = defaultHostName;
  }
  // return `https://login.${hostname}/api/v1`;
  return "https://login.gamodo.net/api/v1";
};

const hostname = getCookieClient("hostname");

export const baseURL = "https://gamodo-apis-dev.link/";

export const AuthBaseURL = getLoginApiUrl(hostname);

export const api_end_points = {
  products: "/products",
  commingsoon_movies: (skip, limit) => {
    return `/movie/comingsoon?skip=${skip}&limit=${limit}`;
  },
  commingsoon_FUllmovies: (skip, limit) => {
    return `/movie/comingsoon?skip=${skip}&limit=${limit}`;
  },
  dealson_traget: (skip, limit) => {
    return `/target/deals?skip=${skip}&limit=${limit}`;
  },
  dealson_Fulltragetlist: (skip, limit) => {
    return `/target/deals?skip=${skip}&limit=${limit}`;
  },
  dealson_Amazon: (skip, limit) => {
    return `/amazon/deals?skip=${skip}&limit=${limit}`;
  },
  dealson_FullAmazonlist: (skip, limit) => {
    return `/amazon/deals?skip=${skip}&limit=${limit}`;
  },
  dealson_Walmart: (skip, limit) => {
    return `/walmart/deals?skip=${skip}&limit=${limit}`;
  },
  dealson_FullWalmartlist: (skip, limit) => {
    return `/walmart/deals?skip=${skip}&limit=${limit}`;
  },
  getBlogData: (skip, limit) => {
    return `/rss/blogs?skip=${skip}&limit=${limit}`;
  },

  getBlogDetailsData: (id) => {
    return `/rss/${id}`;
  },

  commingsoon_moviesDetails: (id) => {
    return `/movie/${id}`;
  },
  dashboardData: "/getDashboardData",
  getMyFavourite: "/getMyFavourite",
  gameData: "getCategoryWiseGames",
  catGameData: "getGameList",
  gameDetails: "getGameDetails",
  saveToRecentlyPlayed: "saveToRecentlyPlayed",
};

export const auth_end_point = {
  login: "/login",
  forgetPassword: "/forgotPassword",
};
