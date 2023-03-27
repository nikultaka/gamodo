import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnline: true,
  drawerMenuOpen: false,
};

const Global = createSlice({
  name: "Global",
  initialState,
  reducers: {
    setIsOnline: (state, { payload }) => {
      state.isOnline = payload;
    },
    openDrawerMenu: (state, { payload }) => {
      state.drawerMenuOpen = payload;
    },
  },
});

export const { setIsOnline, openDrawerMenu } = Global.actions;
export default Global.reducer;
