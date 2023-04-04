import styles from "@/styles/layout/_footer.module.scss";
import Link from "next/link";
import { Cookies } from "react-cookie";
import { Avatar, SwipeableDrawer, styled, Slide } from "@mui/material";
import assest from "@/json/assest";
import Image from "next/image";
import UserIcon from "@/ui/icons/UserIcon";
import HomeIcon from "@/ui/icons/HomeIcon";
import MenuGameIcon from "@/ui/icons/MenuGameIcon";
import CouponIcon from "@/ui/icons/CouponIcon";
import EarphoneIcon from "@/ui/icons/EarphoneIcon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDrawerMenu } from "@/reduxtoolkit/global.slice";
import useWindowScroll from "@/hooks/useWindowScroll";
import { clear_profile_data, profile_data } from "@/reduxtoolkit/profile.slice";
import useNotiStack from "@/hooks/useNotistack";
import { clickableClassName } from "@/pages/_app";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";
const StyledAvatar = styled(Avatar)`
  .MuiAvatar-img {
    object-fit: fill;
  }
`;
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#2B2C33",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#1877F2",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#2B2C33",
    borderRadius: 20 / 2,
  },
}));

const cookie = new Cookies();
const Footer = () => {
  const { toastSuccess, toastError } = useNotiStack();
  const { profileData } = useSelector((state) => state?.profile);
  const { drawerMenuOpen } = useSelector((state) => state.global);
  const { siteConfigs } = useSelector((state) => state.gamodoConfig);
  const dispatch = useDispatch();
  const handleOpenDrawerMenu = useCallback(() => {
    dispatch(openDrawerMenu(true));
  }, []);
  const handleCloseDrawerMenu = useCallback(() => {
    dispatch(openDrawerMenu(false));
  }, []);
  const router = useRouter();

  const [slideIn, setSlideIn] = useState(false);

  //logout
  const logout_func = (hideNotification) => () => {
    cookie.remove("token", { path: "/" });
    dispatch(clear_profile_data([]));
    router.push("/login");
    if (!hideNotification) {
      toastSuccess("Logout successfull");
    }
  };

  useEffect(() => {
    eventEmitter.on(events.auth.logout, logout_func(true));
    return () => {
      eventEmitter.off(events.auth.logout, logout_func(true));
    };
  }, []);

  useEffect(() => {
    dispatch(profile_data({ source: "external" }));
  }, []);

  useWindowScroll({
    onScrollDown: () => {
      setSlideIn(false);
    },
    onScrollUp: () => {
      setSlideIn(true);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setSlideIn(true);
    }, 200);
  }, []);

  const checkIfRouterIsActive = useCallback((route) => {
    if (route === "") {
      return router.pathname === "/";
    }
    return router.pathname?.includes(route);
  }, []);

  const { currentTheme, availableThemes, toggleTheme } = useGamodoTheme();
  const preventDefault = useCallback((e) => {
    e.preventDefault();
  }, []);

  const redirect = () => {
    router.push("/allgames");
  };
  // const redirectCoupon = () => {
  //   router.push("/coupons");
  // };

  const currentRoute = router.pathname;

  return (
    <>
      <Slide in={slideIn} direction={"up"}>
        <footer className={styles.footerWrapper}>
          <div className={styles.footerMenu}>
            <ul>
              <li
                className={
                  currentRoute === "/home" ? styles.active : styles.nonActive
                }
              >
                <Link href="/home" onClick={handleCloseDrawerMenu}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.15251 6.19692L2.58013 6.81306H2.58013L2.15251 6.19692ZM8.54124 1.763L8.11361 1.14685V1.14685L8.54124 1.763ZM13.4588 1.763L13.8864 1.14685V1.14685L13.4588 1.763ZM19.8475 6.19691L19.4199 6.81306L19.8475 6.19691ZM1.81969 10.2448L1.30191 10.7874L1.30191 10.7874L1.81969 10.2448ZM20.1803 10.2448L19.6625 9.70221V9.70221L20.1803 10.2448ZM15.1804 20.25H6.81965V21.75H15.1804V20.25ZM2.58013 6.81306L8.96886 2.37914L8.11361 1.14685L1.72488 5.58077L2.58013 6.81306ZM13.0311 2.37914L19.4199 6.81306L20.2751 5.58077L13.8864 1.14685L13.0311 2.37914ZM18.6107 12.133V17.0108H20.1107V12.133H18.6107ZM3.3893 17.0108V12.133H1.8893V17.0108H3.3893ZM3.3893 12.133C3.3893 11.2143 3.00651 10.3407 2.33747 9.70221L1.30191 10.7874C1.68244 11.1505 1.8893 11.6354 1.8893 12.133H3.3893ZM19.6625 9.70221C18.9935 10.3407 18.6107 11.2143 18.6107 12.133H20.1107C20.1107 11.6354 20.3176 11.1505 20.6981 10.7874L19.6625 9.70221ZM8.96886 2.37914C10.1775 1.54029 11.8224 1.54029 13.0311 2.37914L13.8864 1.14685C12.1634 -0.0489485 9.83661 -0.0489488 8.11361 1.14685L8.96886 2.37914ZM6.81965 20.25C4.89166 20.25 3.3893 18.7671 3.3893 17.0108H1.8893C1.8893 19.6609 4.13015 21.75 6.81965 21.75V20.25ZM15.1804 21.75C17.8698 21.75 20.1107 19.6609 20.1107 17.0108H18.6107C18.6107 18.7671 17.1083 20.25 15.1804 20.25V21.75ZM19.4199 6.81306C20.4262 7.51149 20.53 8.87443 19.6625 9.70221L20.6981 10.7874C22.2624 9.29458 22.05 6.8126 20.2751 5.58077L19.4199 6.81306ZM1.72488 5.58077C-0.0500443 6.8126 -0.262421 9.29458 1.30191 10.7874L2.33747 9.70221C1.47003 8.87443 1.57378 7.51149 2.58013 6.81306L1.72488 5.58077ZM12.25 15C12.25 15.6904 11.6904 16.25 11 16.25V17.75C12.5188 17.75 13.75 16.5188 13.75 15H12.25ZM11 16.25C10.3096 16.25 9.75 15.6904 9.75 15H8.25C8.25 16.5188 9.48122 17.75 11 17.75V16.25ZM9.75 15C9.75 14.3096 10.3096 13.75 11 13.75V12.25C9.48122 12.25 8.25 13.4812 8.25 15H9.75ZM11 13.75C11.6904 13.75 12.25 14.3096 12.25 15H13.75C13.75 13.4812 12.5188 12.25 11 12.25V13.75Z" />
                  </svg>
                  <p>Home</p>
                </Link>
              </li>

              <li
                className={
                  currentRoute === "/favourite-list"
                    ? styles.active
                    : styles.nonActive
                }
              >
                <Link href="/favourite-list">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3.3415L10.463 3.86511C10.6042 4.00987 10.7978 4.0915 11 4.0915C11.2022 4.0915 11.3958 4.00987 11.537 3.86511L11 3.3415ZM11.6851 2.63897L12.222 3.16258L11.6851 2.63897ZM10.315 2.63898L10.8519 2.11538L10.8519 2.11538L10.315 2.63898ZM2.45393 10.3989L1.89742 10.9017L2.45393 10.3989ZM8.18026 16.7371L7.62374 17.2399L8.18026 16.7371ZM13.8197 16.7371L14.3762 17.2399L13.8197 16.7371ZM19.5461 10.3989L20.1026 10.9017L19.5461 10.3989ZM19.4018 2.63896L18.8648 3.16257L19.4018 2.63896ZM2.5982 2.63898L3.13517 3.16259L2.5982 2.63898ZM16 3.38896C15.5858 3.38896 15.25 3.72475 15.25 4.13896C15.25 4.55318 15.5858 4.88896 16 4.88896V3.38896ZM17.25 6.13896C17.25 6.55318 17.5858 6.88896 18 6.88896C18.4142 6.88896 18.75 6.55318 18.75 6.13896H17.25ZM11.537 3.86511L12.222 3.16258L11.1481 2.11536L10.463 2.81789L11.537 3.86511ZM9.77799 3.16259L10.463 3.86511L11.537 2.81789L10.8519 2.11538L9.77799 3.16259ZM1.89742 10.9017L7.62374 17.2399L8.73677 16.2343L3.01044 9.89613L1.89742 10.9017ZM14.3762 17.2399L20.1026 10.9017L18.9896 9.8961L13.2632 16.2343L14.3762 17.2399ZM18.8648 3.16257C20.6618 5.00535 20.7178 7.98321 18.9896 9.8961L20.1026 10.9017C22.3607 8.40232 22.2892 4.52578 19.9388 2.11536L18.8648 3.16257ZM19.9388 2.11536C17.5135 -0.371787 13.5734 -0.371784 11.1481 2.11536L12.222 3.16258C14.0586 1.27914 17.0283 1.27914 18.8648 3.16257L19.9388 2.11536ZM3.13517 3.16259C4.97175 1.27915 7.94141 1.27916 9.77799 3.16259L10.8519 2.11538C8.42666 -0.371771 4.4865 -0.371774 2.06123 2.11537L3.13517 3.16259ZM7.62374 17.2399C9.44282 19.2534 12.5572 19.2534 14.3762 17.2399L13.2632 16.2343C12.0397 17.5886 9.96025 17.5886 8.73677 16.2343L7.62374 17.2399ZM2.06123 2.11537C-0.289225 4.5258 -0.360653 8.40235 1.89742 10.9017L3.01044 9.89613C1.28222 7.98324 1.33823 5.00538 3.13517 3.16259L2.06123 2.11537ZM16 4.88896C16.6903 4.88896 17.25 5.44861 17.25 6.13896H18.75C18.75 4.62018 17.5188 3.38896 16 3.38896V4.88896Z" />
                  </svg>
                  <p>Favorite</p>
                </Link>
              </li>
              <li
                className={
                  currentRoute === "/allgames"
                    ? styles.active
                    : styles.nonActive
                }
              >
                <Link href="/allgames" onClick={redirect}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 23 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.9999 4C7.2445 4 7.44257 4.19828 7.44257 4.44268V5.55722H8.55712C8.80172 5.55722 9 5.7555 9 6.00011C9 6.24451 8.80172 6.44278 8.55712 6.44278H7.44257V7.55712C7.44257 7.80172 7.2445 8 6.9999 8C6.75529 8 6.55722 7.80172 6.55722 7.55712V6.44278H5.44268C5.19807 6.44278 5 6.24451 5 6.00011C5 5.7555 5.19807 5.55722 5.44268 5.55722H6.55722V4.44268C6.55722 4.19828 6.75529 4 6.9999 4Z" />
                    <path d="M17 4.5C17 4.22382 16.5524 4 16 4C15.4479 4 15 4.22382 15 4.5C15 4.77605 15.4479 5 16 5C16.5524 5 17 4.77605 17 4.5Z" />
                    <path d="M16 7C16.5524 7 17 7.22382 17 7.5C17 7.77618 16.5524 8 16 8C15.4479 8 15 7.77618 15 7.5C15 7.22382 15.4479 7 16 7Z" />
                    <path d="M15 6C15 5.44764 14.7762 5 14.5 5C14.2239 5 14 5.44765 14 6C14 6.5521 14.2239 7 14.5 7C14.7762 7 15 6.5521 15 6Z" />
                    <path d="M17.5 5C17.7762 5 18 5.44765 18 6C18 6.5521 17.7762 7 17.5 7C17.224 7 17 6.5521 17 6C17 5.44764 17.224 5 17.5 5Z" />
                    <path
                      d="M15.3163 11.6158L15.3163 11.6158L15.819 13.7333L15.9163 13.7102L15.819 13.7333C16.1485 15.1205 17.395 16.1 18.8288 16.1H19.0068C20.94 16.1 22.4006 14.3569 22.047 12.467L20.6561 5.03016C20.2084 2.63589 18.1052 0.9 15.6543 0.9H7.32282C4.86625 0.9 2.76002 2.64393 2.31842 5.04505C2.31842 5.04505 2.31842 5.04506 2.31842 5.04506L0.951259 12.4759C0.60402 14.3632 2.06367 16.1 3.99318 16.1H4.12398C5.54044 16.1 6.77622 15.1439 7.12274 13.779L7.12275 13.779L7.67619 11.5982L7.57926 11.5736L7.67619 11.5981C7.8084 11.0771 8.28062 10.7113 8.82275 10.7113H14.1653C14.7144 10.7113 15.1907 11.0862 15.3163 11.6158ZM6.65358 11.3414L6.75051 11.366L6.65358 11.3414L6.10014 13.5222C5.87211 14.4205 5.05834 15.0507 4.1244 15.0507H3.9936C2.72116 15.0507 1.76102 13.9059 1.98931 12.6646L3.35601 5.23382C3.70582 3.33193 5.37488 1.94916 7.32282 1.94916L15.6548 1.94906C17.5984 1.94906 19.2646 3.32546 19.6194 5.22199L21.0104 12.6588C21.2429 13.9016 20.2824 15.0507 19.0072 15.0507H18.8293C17.8838 15.0507 17.063 14.405 16.8462 13.4921C16.8462 13.4921 16.8462 13.4921 16.8462 13.4921L16.3437 11.3747L16.3437 11.3747C16.1052 10.3706 15.2032 9.66207 14.1658 9.66207H8.82317C7.79853 9.66207 6.90429 10.3537 6.65358 11.3414Z"
                      strokeWidth="0.2"
                    />
                  </svg>
                  <p>Games</p>
                </Link>
              </li>
              <li
                className={
                  currentRoute === "/coupons" ? styles.active : styles.nonActive
                }
              >
                <Link href="/coupons">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.6554 3.51846C17.1232 3.51846 16.6229 3.72581 16.2461 4.10198C15.4694 4.87866 15.4694 6.14337 16.2461 6.92C16.6349 7.30843 17.1451 7.50266 17.6554 7.50266C18.1656 7.50266 18.6763 7.30844 19.0648 6.92C19.4415 6.54386 19.6483 6.04329 19.6483 5.51067C19.6483 4.97805 19.4409 4.47813 19.0648 4.10134C18.688 3.72561 18.1877 3.51846 17.6554 3.51846ZM18.4042 6.26025C17.9911 6.67328 17.3193 6.67328 16.9063 6.26025C16.4937 5.84723 16.4937 5.17538 16.9063 4.76236C17.1065 4.5621 17.3726 4.45187 17.655 4.45187C17.9374 4.45187 18.2039 4.5621 18.4037 4.76236C18.6036 4.96263 18.7142 5.22874 18.7142 5.5111C18.714 5.79346 18.6044 6.05999 18.4041 6.26025H18.4042Z" />
                    <path
                      d="M7.82842 20C7.66213 19.9575 7.53251 19.8277 7.49042 19.662L7.12303 18.2116M7.82842 20L1.13685 12.7406C1.01828 12.8592 0.972021 13.0323 1.01682 13.1942M7.82842 20L9.27963 20.3683M7.82842 20L9.27963 20.3683M7.12303 18.2116L5.67182 17.8434C5.50595 17.8009 5.37633 17.6715 5.33423 17.5054M7.12303 18.2116L7.08614 18.357L6.99956 18.335M7.12303 18.2116L6.97762 18.2485L6.99956 18.335M5.33423 17.5054L4.96601 16.0538M5.33423 17.5054L5.18884 17.5423C5.24449 17.7618 5.41578 17.9326 5.63459 17.9887L5.63493 17.9888L6.99956 18.335M5.33423 17.5054L5.18883 17.5422L4.84258 16.1772M4.96601 16.0538L3.51374 15.6855C3.34786 15.6435 3.21824 15.5136 3.17615 15.348M4.96601 16.0538L4.92915 16.1992L4.84258 16.1772M4.96601 16.0538L4.82062 16.0906L4.84258 16.1772M3.17615 15.348L2.80605 13.8934M3.17615 15.348L3.03078 15.3849C3.08641 15.6038 3.25759 15.7753 3.47684 15.8309L3.47687 15.8309L4.84258 16.1772M3.17615 15.348L3.03077 15.3849L2.68266 14.0168M2.80605 13.8934L1.35191 13.5233C1.18916 13.4818 1.06121 13.3562 1.01682 13.1942M2.80605 13.8934L2.76905 14.0388L2.68266 14.0168M2.80605 13.8934L2.66068 13.9304L2.68266 14.0168M1.01682 13.1942L0.872159 13.2339C0.872175 13.234 0.872191 13.234 0.872208 13.2341C0.930904 13.4479 1.09993 13.6139 1.31487 13.6686L1.31491 13.6687L2.68266 14.0168M1.01682 13.1942L9.27963 20.3683M9.5024 21.8565C9.5567 22.0721 9.72285 22.241 9.93645 22.3002C9.99013 22.315 10.0455 22.3225 10.1003 22.3225C10.262 22.3225 10.4191 22.2588 10.5363 22.142L10.5364 22.1418L12.1187 20.5592L16.2788 21.5325L16.2788 21.5326L16.2814 21.5331C16.3932 21.5572 16.5051 21.5692 16.616 21.5692C17.242 21.5692 17.8172 21.1897 18.0579 20.5799L18.0588 20.5776L22.0462 9.98254C22.0517 9.96814 22.0545 9.9553 22.056 9.94578C22.0564 9.94291 22.0568 9.94018 22.0571 9.93769C22.3016 9.22295 22.3801 8.45183 22.2606 7.68849L22.2569 7.66502L22.2566 7.66437L21.641 3.73455C21.641 3.73454 21.641 3.73452 21.641 3.73451C21.4623 2.59235 20.5741 1.7039 19.4317 1.52525L15.4786 0.906162C15.4786 0.90616 15.4786 0.906157 15.4786 0.906155C14.0037 0.674711 12.4951 1.16744 11.44 2.22215L11.4399 2.22218L1.03079 12.6345L9.64785 21.8199M9.5024 21.8565L9.64785 21.8199M9.5024 21.8565L9.50246 21.8568L9.64785 21.8199M9.5024 21.8565L9.15619 20.4917M9.64785 21.8199L9.27963 20.3683M9.15619 20.4917L9.24274 20.5136L9.27963 20.3683M9.15619 20.4917L9.13424 20.4051L9.27963 20.3683M9.15619 20.4917L7.79153 20.1454L7.79127 20.1454C7.5719 20.0893 7.40068 19.918 7.34504 19.699L7.34501 19.6989L6.99956 18.335M20.0724 10.8534L10.4306 20.5001L10.2612 19.8314L10.2612 19.8314C10.2056 19.6118 10.0342 19.441 9.81498 19.3849L9.81472 19.3849L8.45009 19.0386L8.10464 17.6748L8.10461 17.6747C8.04898 17.4558 7.87783 17.2844 7.65888 17.2283L7.65852 17.2282L6.29345 16.882L5.94719 15.5169C5.94719 15.5169 5.94718 15.5169 5.94718 15.5169C5.89153 15.2974 5.72024 15.1265 5.50143 15.0705L5.50111 15.0704L4.13494 14.7235L3.78725 13.3558C3.78725 13.3558 3.78724 13.3558 3.78724 13.3558C3.73156 13.1367 3.56025 12.966 3.34152 12.9099L3.34125 12.9098L2.66842 12.7387L12.3123 3.09322L12.3123 3.0932C13.0888 2.31635 14.2017 1.95432 15.2877 2.12385L19.2409 2.74315C19.8519 2.83891 20.3265 3.31352 20.4225 3.92475C20.4225 3.92477 20.4225 3.92478 20.4225 3.9248L21.0418 7.87806C21.2117 8.96348 20.849 10.0764 20.0724 10.8534ZM16.9067 20.1321C16.9065 20.1325 16.9064 20.1328 16.9063 20.1331C16.8481 20.2795 16.6957 20.359 16.551 20.3274C16.5507 20.3273 16.5505 20.3273 16.5502 20.3272L13.1441 19.53L19.5425 13.1292L16.9067 20.1321Z"
                      strokeWidth="0.3"
                    />
                    <path d="M9.70685 11.2741C10.4631 11.2741 11.0783 10.659 11.0783 9.9027V8.91599C11.0783 8.15974 10.4631 7.54459 9.70685 7.54459C8.9506 7.54459 8.33545 8.15974 8.33545 8.91599V9.9027C8.33545 10.659 8.9506 11.2741 9.70685 11.2741ZM9.26903 8.91642C9.26903 8.6751 9.46512 8.47859 9.70685 8.47859C9.94858 8.47859 10.1447 8.67469 10.1447 8.91642V9.90313C10.1447 10.1444 9.94858 10.341 9.70685 10.341C9.46512 10.341 9.26903 10.1449 9.26903 9.90313V8.91642Z" />
                    <path d="M13.3792 11.9852C12.623 11.9852 12.0078 12.6004 12.0078 13.3566V14.3429C12.0078 15.0992 12.623 15.7143 13.3792 15.7143C14.1355 15.7143 14.7506 15.0992 14.7506 14.3429V13.3566C14.7506 12.6004 14.1355 11.9852 13.3792 11.9852ZM13.817 14.3429C13.817 14.5842 13.6209 14.7807 13.3792 14.7807C13.1375 14.7807 12.9414 14.5846 12.9414 14.3429V13.3566C12.9414 13.1153 13.1375 12.9188 13.3792 12.9188C13.6209 12.9188 13.817 13.1149 13.817 13.3566V14.3429Z" />
                    <path d="M14.4529 8.71983C14.2704 8.53728 13.9753 8.53728 13.793 8.71983L8.63349 13.8793C8.45094 14.0619 8.45094 14.3569 8.63349 14.5393C8.72456 14.6303 8.84397 14.676 8.96358 14.676C9.08299 14.676 9.2026 14.6301 9.29367 14.5393L14.4536 9.37979C14.6355 9.19724 14.6355 8.90175 14.453 8.71983H14.4529Z" />
                  </svg>
                  <p>Coupons</p>
                </Link>
              </li>
              <li onClick={handleOpenDrawerMenu} className={clickableClassName}>
                <Link
                  href="/"
                  onClick={preventDefault}
                  className={clickableClassName}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={clickableClassName}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 1C0 0.447715 0.49638 0 1.1087 0H15.8913C16.5036 0 17 0.447715 17 1C17 1.55228 16.5036 2 15.8913 2H1.1087C0.49638 2 0 1.55228 0 1Z"
                      className={clickableClassName}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 7C0 6.44772 0.49638 6 1.1087 6H15.8913C16.5036 6 17 6.44772 17 7C17 7.55228 16.5036 8 15.8913 8H1.1087C0.49638 8 0 7.55228 0 7Z"
                      className={clickableClassName}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 13C0 12.4477 0.49638 12 1.1087 12H15.8913C16.5036 12 17 12.4477 17 13C17 13.5523 16.5036 14 15.8913 14H1.1087C0.49638 14 0 13.5523 0 13Z"
                      className={clickableClassName}
                    />
                  </svg>
                  <p>Menu</p>
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </Slide>
      <SwipeableDrawer
        anchor={"left"}
        open={drawerMenuOpen}
        onOpen={handleOpenDrawerMenu}
        onClose={handleCloseDrawerMenu}
        className={styles.mobMenu}
      >
        {/* <div className={styles.closeMenuMob}>
          <MyButton onClick={handleCloseDrawerMenu}>
            <CancelIcon />
          </MyButton>
        </div> */}
        <div className={styles.sidemenuSec}>
          <div className={styles.menubg}>
            {/* <Image
loading="lazy"
              
              src={assest.menuBg}
              alt="menu1"
              height={198}
              width={215}
            /> */}
            <div className={styles.pfPic}>
              <StyledAvatar
                alt="Remy Sharp"
                src={
                  profileData?.profile_image
                    ? profileData?.profile_image
                    : "/assets/images/defaultProfile.png"
                }
                sx={{ width: 80, height: 80 }}
              />
              <h4>
                {profileData !== undefined
                  ? profileData?.first_name + " " + profileData?.last_name
                  : ""}{" "}
              </h4>
            </div>
          </div>
          <ul>
            <li
              className={`${
                checkIfRouterIsActive("user-profile") || checkIfRouterIsActive("")
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/user-profile" onClick={handleCloseDrawerMenu}>
                <figure className="only-stroke">
                  <UserIcon />
                </figure>
                <p>Profile</p>
              </Link>
            </li>
            <li
              className={`${
                checkIfRouterIsActive("home") || checkIfRouterIsActive("")
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/home" onClick={handleCloseDrawerMenu}>
                <figure className="only-fill">
                  <HomeIcon />
                </figure>
                <p>Home</p>
              </Link>
            </li>
            <li
              className={`${
                checkIfRouterIsActive("allgames") || checkIfRouterIsActive("")
                  ? "active"
                  : ""
              }`}
            >
              <Link
                href="/allgames"
                onClick={() => {
                  redirect(), handleCloseDrawerMenu();
                }}
              >
                <figure className="only-fill">
                  <MenuGameIcon />
                </figure>
                <p>All Games</p>
              </Link>
            </li>
            <li
              className={`${
                checkIfRouterIsActive("coupons") || checkIfRouterIsActive("")
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/coupons" onClick={handleCloseDrawerMenu}>
                <figure className="only-fill">
                  <CouponIcon />
                </figure>
                <p>Coupons</p>
              </Link>
            </li>
            <li>
              <Link
                href={`tel:${siteConfigs?.support_phone}`}
                className={clickableClassName}
              >
                <figure className={"only-stroke " + clickableClassName}>
                  <EarphoneIcon className={clickableClassName} />
                </figure>
                <p className={clickableClassName}>
                  Customer Support <span>{siteConfigs?.support_phone} </span>
                </p>
              </Link>
            </li>
          </ul>
          <div className={styles.themeMode + " " + clickableClassName}>
            <p className={clickableClassName}>
              {currentTheme === availableThemes.darkTheme
                ? "Dark Mode"
                : "Light Mode"}
            </p>
            <div className={clickableClassName}>
              <FormControlLabel
                className={clickableClassName}
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={currentTheme === availableThemes.darkTheme}
                    onChange={() => toggleTheme()}
                    className={clickableClassName}
                    inputProps={{
                      className: clickableClassName,
                    }}
                    classes={{
                      root: clickableClassName,
                      track: clickableClassName,
                    }}
                  />
                }
              />
            </div>
          </div>

          <div
            className={`${
              currentTheme === availableThemes.lightTheme
                ? "menuBottomBgLight"
                : "menuBottomBgDark"
            }`}
          >
            <div className={styles.menuBottomBg + " " + clickableClassName}>
              <MyButton
                onClick={() => {
                  logout_func()(), handleCloseDrawerMenu();
                }}
                className={clickableClassName}
              >
                <Image
                  className={clickableClassName}
                  loading="lazy"
                  src={assest.logout}
                  alt="menu1"
                  height={18}
                  width={16}
                />
                Log Out
              </MyButton>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};
export default Footer;
