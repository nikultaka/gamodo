import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import axiosInstance from "@/axios/authAxiosInstance";
import axiosInstance1 from "@/axios/axiosInstance";
import { Cookies } from "react-cookie";
import { HYDRATE } from "next-redux-wrapper";

const cookie = new Cookies();
const initialState = {
  profileData: null,
  profile_update_status: "idle",
  countryData: [],
  isLoggedIn: false,
  isAuthenticate: true,
  authenticateData: null,
  memberData: null,
  member_verify_status: "idle",
  member_email_verify_status: "idle",
  status: "idle",
  game_search_data_status: "idle",
  feature_game_search_data_status: "idle",
  favourite_search_data_status: "idle",
  coming_soon_game_search_data_status: "idle",
  recently_played_games_search_data_status: "idle",
  new_release_game_search_data_status: "idle",
  popular_now_search_data_status: "idle",
  login_status: null,
  login_msg: "",
  registration_activation_status: null,
  registration_activation_msg: "",
  game_search_data: [],
  favourite_list: [],
  favourite_search_data: [],
  feature_game_search_data: [],
  coming_soon_game_search_data: [],
  recently_played_games_search_data: [],
  new_release_game_search_data: [],
  popular_now_search_data: [],
  recently_played_msg: "",
  recently_played_status: null,
  save_fav_status: null,
  save_fav_msg: "",
  amazon_deals_search_status: null,
  amazon_deals_search_data: [],
  walmart_deals_search_status: null,
  walmart_deals_search_data: [],
  target_deals_search_status: null,
  target_deals_search_data: [],
  blog_search_status: null,
  blog_search_data: [],
  movies_search_status: null,
  movies_search_data: [],
};
export const postForgetPassword = createAsyncThunk(
  "/forgotPassword",
  async (formData) => {
    const response = axiosInstance
      .post("forgotPassword", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;
    // formData
    return resData;
  }
);

export const all_device_logout = createAsyncThunk(
  "/logoutFromAllDevice",
  async (formData) => {
    const response = await axiosInstance.post("/logoutFromAllDevice", formData);
    let resData = response;
    // formData
    return resData;
  }
);

export const resetPassword = createAsyncThunk(
  "/resetPassword",
  async (formData) => {
    const response = axiosInstance
      .post("resetPassword", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const postSendLogInCode = createAsyncThunk(
  "/sendLogInCode",
  async (formData) => {
    const response = axiosInstance
      .post("sendLogInCode", formData)
      .then((response) => response)
      .catch((error) => error);

    let resData = response;
    // formData

    return resData;
  }
);

export const postOTPLogInCode = createAsyncThunk(
  "/logInWithCode",
  async (formData) => {
    const response = await axiosInstance.post("logInWithCode", formData);
    let resData = response;
    // formData

    return resData;
  }
);
export const login = createAsyncThunk("/login", async (formData) => {
  const response = axiosInstance
    .post("login", formData)
    .then((response) => response)
    .catch((error) => error);
  let resData = response;

  // formData
  return resData;
});

export const profile_data = createAsyncThunk(
  "/getEditProfileData",
  async (formData) => {
    const response = axiosInstance
      .post("getEditProfileData", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const profile_update = createAsyncThunk(
  "/updateUserProfile",
  async (formData) => {
    const response = axiosInstance
      .post("updateUserProfile", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);
export const getMyFavourite = createAsyncThunk(
  "/getMyFavourite",
  async (formData) => {
    const response = axiosInstance
      .post("getMyFavourite", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;
    return resData;
  }
);
export const saveFavourite = createAsyncThunk(
  "/saveFavourite",
  async (formData) => {
    const response = axiosInstance
      .post("saveFavourite", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;
    return resData;
  }
);

export const change_password = createAsyncThunk(
  "/changeUserPassword",
  async (formData) => {
    const response = axiosInstance
      .post("changeUserPassword", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const registration_activation = createAsyncThunk(
  "/registrationActivation",
  async (formData) => {
    const response = axiosInstance
      .post("registrationActivation", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const game_search = createAsyncThunk(
  "/api/game_search",
  async (formData) => {
    const response = axiosInstance
      .post("getGameList", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const favourite_search = createAsyncThunk(
  "/api/getMyFavourite",
  async (formData) => {
    const response = axiosInstance
      .post("getMyFavourite", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const feature_game_search = createAsyncThunk(
  "/api/featuregame",
  async (formData) => {
    const response = axiosInstance
      .post("getGameList", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const coming_soon_game_search = createAsyncThunk(
  "/api/comingsoongame",
  async (formData) => {
    const response = axiosInstance
      .post("getGameList", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const recently_played_games_search = createAsyncThunk(
  "/api/recentlyplayed",
  async (formData) => {
    const response = axiosInstance
      .post("getGameList", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);
export const recently_played = createAsyncThunk(
  "/api/saveToRecentlyPlayed",
  async (formData) => {
    const response = axiosInstance
      .post("saveToRecentlyPlayed", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const new_release_search = createAsyncThunk(
  "/api/newrelease",
  async (formData) => {
    const response = axiosInstance
      .post("getGameList", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const popular_now_search = createAsyncThunk(
  "/api/popularnow",
  async (formData) => {
    const response = axiosInstance
      .post("getGameList", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const amazon_deals_search = createAsyncThunk(
  "/api/amazondealsSearch",
  async (formData) => {
    const response = axiosInstance1
      .post("amazon/products_keyword", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const walmart_deals_search = createAsyncThunk(
  "/api/walmartdealsSearch",
  async (formData) => {
    const response = axiosInstance1
      .post("walmart/products_keyword", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const target_deals_search = createAsyncThunk(
  "/api/targetdealsSearch",
  async (formData) => {
    const response = axiosInstance1
      .post("target/products_keyword", formData)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const blog_search = createAsyncThunk(
  "/api/blogSearch",
  async (formData) => {
    const response = axiosInstance1
      .get(
        `rss/blogs?skip=${formData?.skip}&limit=${formData?.limit}&keywords=${formData?.keywords}`
      )
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const movies_search = createAsyncThunk(
  "/api/movieSearch",
  async (formData) => {
    const response = axiosInstance1
      .get(
        `movie/comingsoon?skip=${formData?.skip}&limit=${formData?.limit}&keywords=${formData?.keywords}`
      )
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);
export const verify_member = createAsyncThunk(
  "/autoEnroll",
  async (data) => {
    const response = axiosInstance
      .post("autoEnroll", data)
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);

export const resendActivationEmail = createAsyncThunk(
  "/api/resendActivationEmail",
  async (data, token) => {
    const response = axiosInstance
      .post("resendActivationEmail", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error);
    let resData = response;

    // formData
    return resData;
  }
);
const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUserProfile: (state, { payload }) => {
      state.isLoggedIn = Boolean(payload?._id);
      state.profileData = payload;
    },
    updateUserProfileData: (state, { payload }) => {
      state.profileData = payload?.userData;
      state.countryData = payload?.countries;
    },

    clear_login_status: (state, { action }) => {
      state.login_status = action?.payload;
    },

    clear_registration_activation_status: (state, { action }) => {
      state.registration_activation_status = action?.payload;
    },

    clear_recently_played_status: (state, { action }) => {
      state.recently_played_status = action?.payload;
    },

    clear_save_fav_status: (state, action) => {
      state.save_fav_status = action?.payload;
    },

    clear_profile_data: (state, action) => {
      state.profileData = [];
    },
    setIsAuthenticate: (state, action) => {
      state.isAuthenticate = action?.payload;
    },
    setAuthenticateData: (state, action) => {
      state.authenticateData = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postForgetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postForgetPassword.fulfilled, (state, action) => {
        state.status = "idle";

        if (action?.payload?.status === 200) {
        } else {
        }
      })
      .addCase(postForgetPassword.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(all_device_logout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(all_device_logout.fulfilled, (state, action) => {
        state.status = "idle";

        if (action?.payload?.status === 200) {
        } else {
        }
      })
      .addCase(all_device_logout.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "idle";

        if (action?.payload?.status === 200) {
        } else {
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
        state.login_status = null;
        state.login_msg = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          // setCookie(null, "token", action?.payload?.result?.data?.token, {
          //   maxAge: 30 * 24 * 60 * 60,
          //   path: "/",
          // });
          state.login_status = action?.payload?.status?.error_code;
          state.login_msg = action?.payload?.status?.message;
        } else {
          state.login_status = action?.payload?.status?.error_code;
          state.login_msg = action?.payload?.status?.message;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(profile_data.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(profile_data.fulfilled, (state, action) => {
        state.status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.profileData = action?.payload?.result?.data?.userData;
          state.countryData = action?.payload?.result?.data?.countries;
        }
      })
      .addCase(profile_data.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(postSendLogInCode.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postSendLogInCode.fulfilled, (state, action) => {
        state.status = "idle";

        if (action?.payload?.status === 200) {
        } else {
        }
      })
      .addCase(postSendLogInCode.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(postOTPLogInCode.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postOTPLogInCode.fulfilled, (state, action) => {
        state.status = "idle";

        if (action?.payload?.status?.error_code === 200) {
        } else {
        }
      })
      .addCase(postOTPLogInCode.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(profile_update.pending, (state, action) => {
        state.status = "loading";
        state.profile_update_status = "loading";
      })
      .addCase(profile_update.fulfilled, (state, action) => {
        state.status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.profile_update_status = "idle";
          state.profileData = action?.payload?.result?.data?.userData;
        } else {
          state.profile_update_status = "idle";
        }
      })
      .addCase(profile_update.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(registration_activation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registration_activation.fulfilled, (state, action) => {
        state.status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.registration_activation_status =
            action?.payload?.status?.error_code;
          state.registration_activation_msg = action?.payload?.status?.message;
        } else {
          state.registration_activation_status =
            action?.payload?.status?.error_code;
          state.registration_activation_msg = action?.payload?.status?.message;
        }
      })
      .addCase(registration_activation.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getMyFavourite.pending, (state, action) => {
        state.status = "loading";
        state.favourite_list = [];
      })
      .addCase(getMyFavourite.fulfilled, (state, action) => {
        state.status = "idle";

        if (action?.payload?.status?.error_code == 0) {
          state.favourite_list = action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(getMyFavourite.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(saveFavourite.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(saveFavourite.fulfilled, (state, action) => {
        state.status = "idle";

        if (action?.payload?.status?.error_code == 0) {
          state.save_fav_status = action?.payload?.status?.error_code;
          state.save_fav_msg = action?.payload?.status?.message;
        } else {
        }
      })
      .addCase(saveFavourite.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(game_search.pending, (state, action) => {
        state.game_search_data_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(game_search.fulfilled, (state, action) => {
        state.game_search_data_status = "idle";

        if (action?.payload?.status?.error_code == 0) {
          state.game_search_data = action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(game_search.rejected, (state, action) => {
        state.game_search_data_status = "idle";
      })

      .addCase(favourite_search.pending, (state, action) => {
        state.favourite_search_data_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(favourite_search.fulfilled, (state, action) => {
        state.favourite_search_data_status = "idle";

        if (action?.payload?.status?.error_code == 0) {
          state.favourite_search_data = action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(favourite_search.rejected, (state, action) => {
        state.favourite_search_data_status = "idle";
      })

      .addCase(feature_game_search.pending, (state, action) => {
        state.feature_game_search_data_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(feature_game_search.fulfilled, (state, action) => {
        state.feature_game_search_data_status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.feature_game_search_data = action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(feature_game_search.rejected, (state, action) => {
        state.feature_game_search_data_status = "idle";
      })

      .addCase(recently_played.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(recently_played.fulfilled, (state, action) => {
        state.recently_played_games_search_data_status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.recently_played_msg = action?.payload?.status?.message;
          state.recently_played_status = action?.payload?.status?.error_code;
        } else {
        }
      })
      .addCase(recently_played.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(coming_soon_game_search.pending, (state, action) => {
        state.coming_soon_game_search_data_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(coming_soon_game_search.fulfilled, (state, action) => {
        state.coming_soon_game_search_data_status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.coming_soon_game_search_data = action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(coming_soon_game_search.rejected, (state, action) => {
        state.coming_soon_game_search_data_status = "idle";
      })

      .addCase(recently_played_games_search.pending, (state, action) => {
        state.recently_played_games_search_data = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(recently_played_games_search.fulfilled, (state, action) => {
        state.recently_played_games_search_data = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.recently_played_games_search_data =
            action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(recently_played_games_search.rejected, (state, action) => {
        state.recently_played_games_search_data = "idle";
      })

      .addCase(new_release_search.pending, (state, action) => {
        state.new_release_game_search_data_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(new_release_search.fulfilled, (state, action) => {
        state.new_release_game_search_data_status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.new_release_game_search_data = action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(new_release_search.rejected, (state, action) => {
        state.new_release_game_search_data_status = "idle";
      })

      .addCase(popular_now_search.pending, (state, action) => {
        state.popular_now_search_data_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(popular_now_search.fulfilled, (state, action) => {
        state.popular_now_search_data_status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.popular_now_search_data = action?.payload?.result?.data;
        } else {
        }
      })
      .addCase(popular_now_search.rejected, (state, action) => {
        state.popular_now_search_data_status = "idle";
      })
      .addCase(amazon_deals_search.pending, (state, action) => {
        state.amazon_deals_search_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(amazon_deals_search.fulfilled, (state, action) => {
        state.amazon_deals_search_status = "idle";
        state.amazon_deals_search_data = action?.payload;
      })
      .addCase(amazon_deals_search.rejected, (state, action) => {
        state.amazon_deals_search_status = "idle";
        state.amazon_deals_search_data = action?.payload;
      })

      .addCase(walmart_deals_search.pending, (state, action) => {
        state.walmart_deals_search_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(walmart_deals_search.fulfilled, (state, action) => {
        state.walmart_deals_search_status = "idle";
        state.walmart_deals_search_data = action?.payload;
      })
      .addCase(walmart_deals_search.rejected, (state, action) => {
        state.walmart_deals_search_status = "idle";
        state.walmart_deals_search_data = action?.payload;
      })

      .addCase(target_deals_search.pending, (state, action) => {
        state.target_deals_search_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(target_deals_search.fulfilled, (state, action) => {
        state.target_deals_search_status = "idle";
        state.target_deals_search_data = action?.payload;
      })
      .addCase(target_deals_search.rejected, (state, action) => {
        state.target_deals_search_status = "idle";
        state.target_deals_search_data = action?.payload;
      })
      .addCase(blog_search.pending, (state, action) => {
        state.blog_search_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(blog_search.fulfilled, (state, action) => {
        state.blog_search_status = "idle";
        state.blog_search_data = action?.payload;
      })
      .addCase(blog_search.rejected, (state, action) => {
        state.blog_search_status = "idle";
        state.blog_search_data = action?.payload;
      })
      .addCase(movies_search.pending, (state, action) => {
        state.movies_search_status = "loading";
        state.favourite_search_data = [];
        state.game_search_data = [];
        state.feature_game_search_data = [];
        state.coming_soon_game_search_data = [];
        state.recently_played_games_search_data = [];
        state.new_release_game_search_data = [];
        state.popular_now_search_data = [];
        state.amazon_deals_search_data = [];
        state.walmart_deals_search_data = [];
        state.target_deals_search_data = [];
        state.blog_search_data = [];
        state.movies_search_data = [];
      })
      .addCase(movies_search.fulfilled, (state, action) => {
        state.movies_search_status = "idle";
        state.movies_search_data = action?.payload;
      })
      .addCase(movies_search.rejected, (state, action) => {
        state.movies_search_status = "idle";
        state.movies_search_data = action?.payload;
      })

      //

      .addCase(verify_member.pending, (state, action) => {
        state.status = "loading";
        state.member_verify_status = "loading";
      })
      .addCase(verify_member.fulfilled, (state, action) => {
        state.status = "idle";
        if (action?.payload?.status?.error_code == 0) {
          state.member_verify_status = "idle";
          state.memberData = action?.payload?.result?.data;
        } else {
          state.member_verify_status = "idle";
        }
      })
      .addCase(verify_member.rejected, (state, action) => {
        state.status = "idle";
        state.member_verify_status = "idle";
      })


    //

    //---

    .addCase(resendActivationEmail.pending, (state, action) => {
      state.status = "loading";
      state.member_email_verify_status = "loading";
    })
    .addCase(resendActivationEmail.fulfilled, (state, action) => {
      state.status = "idle";
      if (action?.payload?.status?.error_code == 0) {
        state.member_email_verify_status = "idle";
        // state.memberData = action?.payload?.result?.data;
      } else {
        state.member_email_verify_status = "idle";
      }
    })
    .addCase(resendActivationEmail.rejected, (state, action) => {
      state.status = "idle";
      state.member_email_verify_status = "idle";
    });


    //---

    builder.addCase(HYDRATE, (state, { payload }) => {
      return {
        ...state,
        ...payload.profile,
      };
    });
  },
});

export const {
  setUserProfile,
  setIsAuthenticate,
  setAuthenticateData,
  clear_login_status,
  clear_recently_played_status,
  clear_save_fav_status,
  clear_profile_data,
  clear_registration_activation_status,
  updateUserProfileData,
} = profileSlice.actions;
export default profileSlice.reducer;
