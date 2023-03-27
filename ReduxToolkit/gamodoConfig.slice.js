import axiosInstance from "@/axios/authAxiosInstance";
import {
  availableThemes,
  themeSwitchModes,
} from "@/hooks/useGamodoThemeProvider";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  currentTheme: availableThemes.defaultTheme,
  themeSwitchMode: themeSwitchModes.system,
  fetchingSiteConfigs: true,
  siteConfigs: null,
  appInstallationPromptTriggeredAutomaticCount: 0,
  viewedInstallationInfoCount: false,
};

export const gamodoConfigCookieName = "gamodo";
export const isGamodoConfigCompressed = true;
export const fetchMasterSettings = async () => {
  return axiosInstance.post("getMasterSetting", { source: "external" });
};
export const fetchMasterSettingsThunk = createAsyncThunk(
  "/api/getMasterSetting",
  fetchMasterSettings
);
const GamodoConfig = createSlice({
  name: "gamodoConfig",
  initialState,
  reducers: {
    increaseAppInstallationTriggerCount: (state) => {
      state.appInstallationPromptTriggeredAutomaticCount += 1;
    },
    increaseViewedInstallationInfoCount: (state) => {
      state.viewedInstallationInfoCount += 1;
    },
    setGamodoTheme: (state, { payload }) => {
      state.currentTheme = payload;
    },
    setGamodoThemeSwitchMode: (state, { payload }) => {
      state.themeSwitchMode = payload;
    },
    setSiteConfigs: (state, { payload }) => {
      if (payload?.status?.error_code === 0) {
        state.siteConfigs = payload?.result?.data;
      }
      state.fetchingSiteConfigs = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, { payload }) => {
        return {
          ...state,
          ...payload.gamodoConfig,
        };
      })
      .addCase(fetchMasterSettingsThunk.pending, (state) => {
        state.fetchingSiteConfigs = true;
      })
      .addCase(fetchMasterSettingsThunk.fulfilled, (state, { payload }) => {
        if (payload?.status?.error_code === 0) {
          state.siteConfigs = payload?.result?.data;
        }
        state.fetchingSiteConfigs = false;
      })
      .addCase(fetchMasterSettingsThunk.rejected, (state) => {
        state.fetchingSiteConfigs = false;
      });
  },
});

export const {
  setGamodoTheme,
  setGamodoThemeSwitchMode,
  setSiteConfigs,
  increaseAppInstallationTriggerCount,
  increaseViewedInstallationInfoCount,
} = GamodoConfig.actions;
export default GamodoConfig;
