/* eslint-disable react-hooks/exhaustive-deps */
import {
  gamodoConfigCookieName,
  setGamodoTheme,
  setGamodoThemeSwitchMode,
} from "@/reduxtoolkit/gamodoConfig.slice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  checkWindow,
  getDecryptedCookieValue,
} from "@/lib/functions/_helpers.lib";
/* Just a constant object that is used to set the theme switch mode. */
export const themeSwitchModes = {
  system: "system",
  manually: "manually",
};
/* Just a constant object that is used to set the themes. */
export const availableThemes = {
  darkTheme: "dark-mode",
  lightTheme: "light-mode",
  defaultTheme: "light-mode", //temporary
};

/**
 * If the body element has a class of classToRemove, remove it.
 * @param classToRemove - The class to remove from the body element.
 */
export const removeBodyClass = (classToRemove) => {
  if (!checkWindow()) {
    return;
  }
  const body = document.querySelector("body");
  if (body.classList.contains(classToRemove)) {
    body.classList.remove(classToRemove);
  }
};

/**
 * If the body element doesn't have the classToAdd class, add it.
 * @param classToAdd - The class to add to the body element.
 */
export const addBodyClass = (classToAdd) => {
  if (!checkWindow()) {
    return;
  }
  const body = document.querySelector("body");
  if (!body.classList.contains(classToAdd)) {
    body.classList.add(classToAdd);
  }
};

/* Checking if the cookie is set or not. If it is set, it will add the class to the body element. */
//this is set to fixed delayed theme setting.
const themeInitialValue = getDecryptedCookieValue("gamodo");
let setDefaultTheme = true;
if (themeInitialValue?.currentTheme) {
  addBodyClass(themeInitialValue?.currentTheme);
  setDefaultTheme = false;
}

if (setDefaultTheme) {
  addBodyClass(availableThemes.defaultTheme);
}

/**
 * It will set the theme according to the system's theme, and it will toggle between the
 * themes when the user clicks on the toggle button
 * @returns The current theme, the toggleTheme function, and the availableThemes object.
 */
export default function useGamodoThemeProvider() {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector((state) => state?.gamodoConfig);

  //add or remove classes while theme change
  useEffect(() => {
    if (typeof currentTheme === "string" && currentTheme) {
      addBodyClass(currentTheme);
    }
    return () => {
      if (typeof currentTheme === "string" && currentTheme) {
        removeBodyClass(currentTheme);
      }
    };
  }, [currentTheme]);

  //set dark theme
  const setDarkTheme = useCallback(() => {
    dispatch(setGamodoTheme(availableThemes.darkTheme));
  }, [availableThemes]);

  //set light theme
  const setLightTheme = useCallback(() => {
    dispatch(setGamodoTheme(availableThemes.lightTheme));
  }, [availableThemes]);

  //set default theme according to system changes
  // useEffect(() => {
  //   /* Checking if the themeSwitchMode is set to system. If it is, it will check if the system is set
  //   to dark or light. If it is dark, it will set the theme to dark. If it is light, it will set the
  //   theme to light. */
  //   let themeMatchMedia = null;
  //   if (
  //     typeof window !== "undefined" &&
  //     themeSwitchMode === themeSwitchModes.system
  //   ) {
  //     themeMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  //     if (themeMatchMedia.matches) {
  //       setDarkTheme();
  //     } else {
  //       setLightTheme();
  //     }
  //     themeMatchMedia.onchange = (e) => {
  //       if (e.matches) {
  //       setDarkTheme();
  //       } else {
  //         setLightTheme();
  //       }
  //     };
  //   }
  //   return () => {
  //     if (themeMatchMedia) {
  //       themeMatchMedia.onchange = null;
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [themeSwitchMode]);

  //toggle between themes, or you can pass the class/theme name to apply specific theme
  const toggleTheme = useCallback(
    (applyThisOne) => {
      /* Checking if the theme is available or not. If it is available, it will apply the theme. If it
      is not available, it will apply the default theme. */
      if (applyThisOne) {
        let found = false;
        if (Object.values(availableThemes)?.includes(applyThisOne)) {
          dispatch(setGamodoTheme(applyThisOne));
          found = true;
        }
        if (Object.keys(availableThemes)?.includes(applyThisOne)) {
          dispatch(setGamodoTheme(availableThemes?.[applyThisOne]));
          found = true;
        }
        if (!found) {
          dispatch(setGamodoTheme(availableThemes.defaultTheme));
          // eslint-disable-next-line no-console
        }
      } else {
        if (currentTheme === availableThemes.darkTheme) {
          setLightTheme();
        }
        if (currentTheme === availableThemes.lightTheme) {
          setDarkTheme();
        }
      }
      dispatch(setGamodoThemeSwitchMode(themeSwitchModes.manually));
    },
    [
      currentTheme,
      setDarkTheme,
      availableThemes,
      setLightTheme,
      themeSwitchModes,
    ]
  );

  return { currentTheme, toggleTheme, availableThemes };
}
