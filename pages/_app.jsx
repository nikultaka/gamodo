/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import "@/styles/global.scss";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Provider } from "react-redux";
import { wrapper } from "@/reduxtoolkit/store";
import ThemeCustomization from "@/themes/index";
import GamodoThemeProvider from "contexts/GamodoThemeContext";
import DesktopView from "@/components/DesktopView/DesktopView";
import {
  checkWindow,
  isApple,
  isInStandaloneMode,
  isIosDevice,
  matchMobileUserAgent,
} from "@/lib/functions/_helpers.lib";
import IosShareIcon from "@mui/icons-material/IosShare";
import CloseIcon from "@mui/icons-material/Close";
import {
  fetchMasterSettings,
  increaseAppInstallationTriggerCount,
  increaseViewedInstallationInfoCount,
  setSiteConfigs,
} from "@/reduxtoolkit/gamodoConfig.slice";
import Loader from "@/ui/Loaders/Loader";
import { QueryClient, QueryClientProvider } from "react-query";
import NextProgress from "next-progress";
import { getAxiosBaseUrl, setAxiosContext } from "@/axios/authAxiosInstance";
import App from "next/app";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";
import ToastifyProvider from "@/ui/toastify/ToastifyProvider";
import {
  Box,
  IconButton,
  NoSsr,
  Slide,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import assest from "@/json/assest";
import { useRouter } from "next/router";
import { useWindowSize } from "@/hooks/useWindowSize";

const ShowIphoneInstallationPromptContainer = styled(Box)`
  &:hover {
    .close-icon {
      opacity: 1;
    }
  }
  .close-icon {
    opacity: 1;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: auto;
    transition: all 0.2s ease-in-out;
  }
  user-select: none;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  padding: 10px 20px;
  color: #000;
  box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12),
    0 6px 25px -4px rgba(137, 137, 137, 0.3);
  background: #fff;
  border-radius: 0.275rem;
  align-items: center;
  z-index: 1101;
  gap: 12px;

  @media (max-width: 1024px) {
    width: 100%;
    left: 0;
    bottom: 0;
  }
  img {
    width: 30px;
    transform-style: preserve-3d;
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    pointer-events: none;
  }
  span {
    font-size: 13px;
    svg {
      margin-bottom: -3px;
      pointer-events: none;
    }
    pointer-events: none;
  }

  @keyframes floating {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 5px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {};
  }
}

export let embeddedFrame = null;
if (checkWindow()) {
  embeddedFrame = window.frameElement;
}
export let appInstallationPrompt = null;
export const setAppInstallationPrompt = (prompt) => {
  appInstallationPrompt = prompt;
};
export const getAppInstallationPrompt = (prompt) => {
  return appInstallationPrompt;
};
const promptInstallation = async () => {
  const appInstallationPrompt = getAppInstallationPrompt();
  if (appInstallationPrompt) {
    appInstallationPrompt.prompt();
    return appInstallationPrompt.userChoice;
  }
  return null;
};
export function checkInsideInstalledPWAApp() {
  if (!checkWindow()) {
    return false;
  }
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    window.navigator.standalone === true
  );
}
let isInsidePWA = checkInsideInstalledPWAApp();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const clickableClassName = `im-ar-${Date.now()}`;

const ViewModes = {
  mobile: "mobile",
  desktop: "desktop",
};
const MobileViewRoutes = [
  "/login",
  "/change-password",
  "/registration-activation",
  "/reset-password",
  "/enterEmail",
];
function MyApp({ Component, userAgent, isUserAgentMobileServer, ...rest }) {
  fixSSRLayout();
  const { store, props } = wrapper.useWrappedStore(rest);
  const state = store.getState();
  const dispatch = store.dispatch;

  const [canInstall, setCanInstall] = useState(false);
  const [isUserAgentMobile, setIsUserAgentMobile] = useState(
    isUserAgentMobileServer
  );
  const [showInstallationInfo, setShowInstallationInfo] = useState(false);
  const initiallyUserClickedOrTouched = useRef(false);

  const promptInstallationListener = useCallback(() => {
    if (!initiallyUserClickedOrTouched.current) {
      promptInstallation();
      dispatch(increaseAppInstallationTriggerCount());
      initiallyUserClickedOrTouched.current = true;
      document.removeEventListener("click", promptInstallationListener);
    }
  }, []);

  useEffect(() => {
    if (checkWindow()) {
      window.addEventListener("beforeinstallprompt", function (e) {
        eventEmitter.emit(events.pwa.canInstall, true);
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        setAppInstallationPrompt(e);
        if (
          state.gamodoConfig.appInstallationPromptTriggeredAutomaticCount < 1
        ) {
          document.addEventListener("click", promptInstallationListener);
        }

        console.log("canInstall", true);
        setCanInstall(true);
      });

      window.addEventListener("appinstalled", async function (e) {
        eventEmitter.emit(events.pwa.canInstall, false);
        setCanInstall(false);
        console.log("canInstall", false);
        closeInstallationInfo();
      });
    }
  }, []);

  const freezeAllClicks = useCallback((e) => {
    const omittedClasses = ["MuiBackdrop-root", clickableClassName];
    if (
      !omittedClasses.some((className) =>
        e.target.classList.contains(className)
      )
    ) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (embeddedFrame) {
      document.addEventListener("click", freezeAllClicks, true);
    }
    return () => {
      if (embeddedFrame) {
        document.removeEventListener("click", freezeAllClicks, true);
      }
    };
  }, []);

  const router = useRouter();
  const [viewMode, setViewMode] = useState(ViewModes.mobile);
  useEffect(() => {
    let tempViewMode =
      isUserAgentMobile || embeddedFrame ? ViewModes.mobile : ViewModes.desktop;
    if (MobileViewRoutes.some((route) => router.pathname.startsWith(route))) {
      tempViewMode = ViewModes.mobile;
    }
    if (rest?.router?.route === "/404") {
      tempViewMode = ViewModes.mobile;
    }

    setViewMode(tempViewMode);
  }, [isUserAgentMobile, embeddedFrame, router.pathname]);

  const [width] = useWindowSize();
  //no fishy method
  useEffect(() => {
    const userAgentMatchResult = matchMobileUserAgent(navigator.userAgent);
    setIsUserAgentMobile(Boolean(userAgentMatchResult));
  }, [width]);

  const syncWithParentWindowPushstate = useCallback((url, event) => {
    window.parent?.postMessage(
      {
        event: {
          url,
          ...event,
        },
        state: "push",
        type: "syncWithParent",
      },
      "*"
    );
  }, []);

  const syncWithParentWindowPopstate = useCallback((event) => {
    window.parent?.postMessage(
      { event, state: "pop", type: "syncWithParent" },
      "*"
    );
  }, []);

  // SYNC PARENT BROWSER PATH
  //needs more work, if you want crystal clear navigation with iframe
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const data = event?.data;
      if (data.type === "syncWithParent") {
        if (data.state === "push") {
          router.push(data.event.url);
        }
        // if (data.state === "pop") {
        //   router.back();
        // }
      }
    });
  }, []);

  useEffect(() => {
    if (embeddedFrame) {
      router.beforePopState(syncWithParentWindowPopstate);
      router.events.on("routeChangeComplete", syncWithParentWindowPushstate);
    }
    return () => {
      router.events.off("routeChangeComplete", syncWithParentWindowPushstate);
    };
  }, []);

  const text = useMemo(() => {
    isInsidePWA = checkInsideInstalledPWAApp();
    if (!embeddedFrame && !isInsidePWA) {
      if (isUserAgentMobile) {
        if (state.gamodoConfig.viewedInstallationInfoCount < 1) {
          if (checkWindow()) {
            if (isIosDevice()) {
              if (!isInStandaloneMode()) {
                setShowInstallationInfo(true);
                dispatch(increaseViewedInstallationInfoCount());
                return (
                  <>
                    click <IosShareIcon color="info" fontSize="small" /> icon
                  </>
                );
              }
            } else {
              if (canInstall) {
                setShowInstallationInfo(true);
                dispatch(increaseViewedInstallationInfoCount());
                return "click menu and install app";
              }
            }
          }
        }
      }
    }
    return null;
  }, [canInstall, isUserAgentMobile]);

  const closeInstallationInfo = useCallback(() => {
    setShowInstallationInfo(false);
  }, []);

  const [loader, setLoader] = useState(true);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    //DELAY the loader so we can see better fade-out animation
    timeoutRef.current = setTimeout(() => {
      setLoader(false);
    }, 600);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <NextProgress
        height={8}
        color={"var(--nextProgressBarColor)"}
        options={{ showSpinner: false }}
      />
      <GamodoThemeProvider isUserAgentMobile={isUserAgentMobile}>
        <QueryClientProvider client={queryClient}>
          <ThemeCustomization>
            <NoSsr>
              <Slide direction="up" in={showInstallationInfo && !loader}>
                <ShowIphoneInstallationPromptContainer
                  onClick={() => {
                    if (isUserAgentMobile) {
                      promptInstallation();
                    }
                  }}
                >
                  <IconButton
                    color="error"
                    onClick={closeInstallationInfo}
                    className="close-icon"
                    size="small"
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>

                  <Box component={"img"} src={assest.iPhoneIcon} />
                  <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                  >
                    <Typography component={"span"} fontWeight={"bold"}>
                      Add {state.gamodoConfig?.siteConfigs?.site_name} to home
                      screen
                    </Typography>
                    <Typography component={"span"}>{text}</Typography>
                  </Stack>
                </ShowIphoneInstallationPromptContainer>
              </Slide>
            </NoSsr>
            <ToastifyProvider>
              <Loader fullScreen open={loader} />
              {viewMode === ViewModes.mobile && (
                <Component
                  {...props.pageProps}
                  userAgent={userAgent}
                  isUserAgentMobile={isUserAgentMobile}
                  isMobileView={ViewModes.mobile}
                  isDesktopView={ViewModes.desktop}
                  isInsidePWA={isInsidePWA}
                />
              )}

              {viewMode === ViewModes.desktop && <DesktopView url={"/"} />}
            </ToastifyProvider>
          </ThemeCustomization>
        </QueryClientProvider>
      </GamodoThemeProvider>
    </Provider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appContext) => {
    const { ctx } = appContext;
    setAxiosContext(ctx);
    const appProps = await App.getInitialProps(appContext);
    const resolvedBaseUrl = getAxiosBaseUrl();
    if (resolvedBaseUrl && !store.getState().gamodoConfig.siteConfigs) {
      try {
        const response = await fetchMasterSettings();
        store.dispatch(setSiteConfigs(response));
      } catch (e) {
        console.log("error in fetching master settings");
      }
    }

    const userAgent = ctx?.req
      ? ctx?.req?.headers["user-agent"]
      : navigator?.userAgent;
    let userAgentMobileMatchResult = matchMobileUserAgent(userAgent);

    return {
      ...appProps,
      isUserAgentMobileServer: Boolean(userAgentMobileMatchResult),
      userAgent: userAgent,
    };
  }
);
export default MyApp;
