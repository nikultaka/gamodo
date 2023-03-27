import { useRouter } from "next/router";
import axiosInstance from "../../Axios/axiosInstance";
import authAxiosInstance from "../../Axios/authAxiosInstance";
import { api_end_points } from "../Endpoints/apiEndPoints";

export const GetProductDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.products)
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const saveToRecently = async (data) => {
  const _res = authAxiosInstance
    .post(
      api_end_points.saveToRecentlyPlayed,
      {
        slug: data?.slug,
        source: data?.source,
      },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      }
    )
    .then((response) => response)
    .catch((error) => error);
  return _res;
};

export const GetCommingsoonmoviesDataList = async (data) => {
  const _res = axiosInstance
    .get(api_end_points.commingsoon_movies(0, 10), {
      headers: {
        Authorization: `Bearer ${data?.token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetdealsonTargetDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.dealson_traget(0, 10))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetdealsonTargetFullDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.dealson_Fulltragetlist(0, 0))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetdealsonAmazonDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.dealson_Amazon(0, 10))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetdealsonAmazonFullDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.dealson_FullAmazonlist(0, 0))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetBlogsFullDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.getBlogData(0, 0))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetdealsonWalmartDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.dealson_Walmart(0, 10))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetdealsonWalmartFullDataList = async () => {
  const _res = axiosInstance
    .get(api_end_points.dealson_FullWalmartlist(0, 0))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const GetComingFullList = async () => {
  const _res = axiosInstance
    .get(api_end_points.commingsoon_FUllmovies(0, 0))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};
export const GetCommingsoonmoviesDataDeatils = async (id) => {
  const _res = axiosInstance
    .get(api_end_points.commingsoon_moviesDetails(id))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};
export const GetDashboardData = async (data) => {
  const _res = authAxiosInstance
    .post(
      api_end_points.dashboardData,
      {
        source: data?.source,
      },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      }
    )
    .then((response) => response)
    .catch((error) => error);
  return _res;
};
export const getMyFavourite = async () => {
  const _res = authAxiosInstance
    .post(api_end_points.getMyFavourite, {
      source: "external",
      start_page: "all",
    })
    .then((response) => response)
    .catch((error) => error);
  return _res;
};

export const GetGameData = async (data, token) => {
  const _res = authAxiosInstance
    .post(
      api_end_points.gameData,
      { source: "external" },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      }
    )
    .then((response) => {
      if (response.status.error_code === 1) {
        return [];
      }
      return response?.result?.data;
    })
    .catch(() => {
      return [];
    });

  return _res;
};

export const GetCatGameData = async (data, token) => {
  const _res = authAxiosInstance
    .post(
      api_end_points.catGameData,
      {
        source: data?.source,
        category_id: data?.category_id,
        page: data?.page,
      },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      }
    )
    .then((response) => {
      if (response.status.error_code === 1) {
        return [];
      }
      return response?.result?.data;
    })
    .catch(() => {
      return [];
    });

  return _res;
};

export const GetAllCatGames = async (data, token) => {
  const _res = authAxiosInstance
    .post(
      api_end_points.catGameData,
      {
        source: data?.source,
        type: data?.type,
        page: data?.page,
      },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      }
    )
    .then((response) => {
      if (response.status.error_code === 1) {
        return [];
      }
      return response?.result?.data;
    })
    .catch(() => {
      return [];
    });

  return _res;
};

export const gameDetails = async (data, token) => {
  const _res = authAxiosInstance
    .post(
      api_end_points.gameDetails,
      {
        source: data?.source,
        slug: data?.slug,
      },
      {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      }
    )
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export const blogsDetails = async (data, token) => {
  const _res = axiosInstance
    .get(api_end_points.getBlogDetailsData(data?.slug))
    .then((response) => response)
    .catch((error) => error);

  return _res;
};

export default GetProductDataList;
