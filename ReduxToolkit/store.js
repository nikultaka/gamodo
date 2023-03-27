import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global.slice";
import profileSlice from "./profile.slice";
import { createWrapper } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

import GamodoConfig, {
  gamodoConfigCookieName,
  isGamodoConfigCompressed,
} from "./gamodoConfig.slice";

const reducers = {
  global: globalSlice,
  profile: profileSlice,

  [GamodoConfig.name]: GamodoConfig.reducer,
};

const stateSyncConfig = {
  channel: `gamodoCouponBroadcaster`,
  predicate: (action) => {
    // return true;
    var [main, second] = action.type?.split("/");
    const whitelistStartWords = ["setGamodoTheme", "setGamodoThemeSwitchMode"];
    if (whitelistStartWords?.includes(second)) {
      return true;
    }
    return false;
  },
};

const makeStore = wrapMakeStore(() => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [
            {
              subtree: `${GamodoConfig.name}`,
              cookieName: gamodoConfigCookieName,
              defaultState: GamodoConfig.getInitialState(),
              compress: isGamodoConfigCompressed,
            },
            {
              subtree: "profile.profileData",
              cookieName: "profile",
              defaultState: null,
              compress: true,
            },
          ],
          secure: true,
          sameSite: true,
        })
      );
      middleware.push(createStateSyncMiddleware(stateSyncConfig));
      return middleware;
    },
  });
  initMessageListener(store);
  return store;
});
export const wrapper = createWrapper(makeStore);
