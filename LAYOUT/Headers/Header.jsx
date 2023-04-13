import styles from "@/styles/layout/_header.module.scss";
import assest from "@/json/assest";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  InputBase,
  Slide,
  styled,
  TextField,
} from "@mui/material";
import SearchIcon from "@/ui/icons/SearchIcon";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDrawerMenu } from "@/reduxtoolkit/global.slice";
import useWindowScroll from "@/hooks/useWindowScroll";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import WarningIcon from '@mui/icons-material/Warning';
// import Button from '@mui/material/Button';
import useNotiStack from "@/hooks/useNotistack";
import { resendActivationEmail, changeActivationEmail } from "@/reduxtoolkit/profile.slice";
import ChangeEmailPopup from "@/components/Popups/ChangeEmailPopup";

const StyledSearchContainer = styled(Box)`
  display: flex;
  align-content: center;
  background-color: var(--searchBg);
  border-radius: 8px;
  min-width: 1px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  .MuiButtonBase-root {
    flex-grow: 1;
    flex-shrink: 0;
  }
  margin: auto;

  transition: all 225ms ease-in-out 0ms;
  &.showSearchInput {
    width: 90%;
    position: absolute;
    bottom: -21px;
    left: 0;
    right: 0;
  }
  &.hideSearchInput {
    width: 42px;
    position: relative;
    // bottom: 0;
    left: 0;
    .MuiInputBase-root {
      display: none;
    }
    .closeSearch {
      display: none;
      svg {
        font-size: 20px;

        path {
          fill: #a9acb2 !important;
        }
      }
    }
  }
  .MuiButtonBase-root {
    &:active,
    &:hover {
      box-shadow: none;
      background-color: transparent;
    }
    padding: 13px;
    min-width: 1px;
    background-color: transparent;
    box-shadow: none;
  }
`;

const Header = ({ title, subtext, hideProfile }) => {
  const { profileData, memberData } = useSelector((state) => state?.profile);
  const { drawerMenuOpen } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { toastSuccess, toastError } = useNotiStack();
  const [open, setOpen] = useState(false)
  const [openSearchBox, setOpenSearchBox] = useState(false);

  const [openChangeEmailPopup, setOpenChangeEmailPopup] = useState(false)
  const [email, setEmail] = useState('')

  const handleOpenDrawerMenu = useCallback(() => {
    dispatch(openDrawerMenu(true));
  }, []);

  const router = useRouter();
  const searchInputRef = useRef(null);
  const headerRef = useRef(null);

  const routeToProfile = useCallback(() => {
    router.push("/profile");
  }, []);
  const routeToSearch = useCallback(() => {
    router.push("/search");
  }, []);

  const toggleSearch = useCallback(() => {
    setOpenSearchBox((prevState) => {
      const nextState = !prevState;
      if (nextState && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current.focus();
        }, 300);
      }
      return nextState;
    });
  }, [openSearchBox]);

  const [slideIn, setSlideIn] = useState(true);

  useWindowScroll({
    onScrollDown: (scrollPosition) => {
      if (headerRef?.current) {
        if (scrollPosition?.positionY > headerRef?.current?.offsetHeight) {
          setSlideIn(false);
          setOpenSearchBox(false);
        }
      }
    },
    onScrollUp: () => {
      setSlideIn(true);
    },
  });

  const [searchValue, setSearchValue] = useState("");

  const search_func = () => {
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  const onClickResend = () => {
    let payload = {}
    payload.data = {}
    payload.data.source = "external"
    payload.token = memberData?.token

    dispatch(resendActivationEmail(payload)).then((res) => {
      if (res?.payload?.status?.error_code == 0) {
        toastSuccess(res?.payload?.status?.message);
        localStorage.removeItem('accountVerification');
        setOpen(false)

      } else {
        toastError(res?.payload?.status?.message);
        setOpen(false)
      }
    });

  }

  const searchBoxOpen = useCallback(() => {
    if (!openSearchBox) {
      setOpenSearchBox(true);
    } else {
      search_func();
    }
  }, [openSearchBox, search_func]);

  const closeSearchBox = useCallback(() => {
    setOpenSearchBox(false);
  }, [openSearchBox]);

  // useEffect(() => {
  //   if (memberData && !memberData.password_exist && localStorage.getItem('accountVerification')) {
  //     setOpen(true)
  //   }
  // }, [memberData])

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const onClickChange = () => {
    setEmail('')
    setOpenChangeEmailPopup(true)
  }


  const onClickChangeEmail = () => {
    let payload = {}
    payload.data = {}
    payload.data.email = email
    payload.data.source = "external"
    payload.token = memberData?.token

    dispatch(changeActivationEmail(payload)).then((res) => {
      if (res?.payload?.status?.error_code == 0) {
        toastSuccess(res?.payload?.status?.message);
        setOpenChangeEmailPopup(false)
        setOpen(false)
        setEmail('')
        localStorage.removeItem('accountVerification');


      } else {
        toastError(res?.payload?.status?.message);
        // setOpen(false)
      }
    });

  }


  return (
    <>

      <Slide in={slideIn} direction={"down"}>



        <Box className={styles.headerWrapper} ref={headerRef}>
          {/* <ChangeEmailPopup
            open={openChangeEmailPopup}
            setOpen={setOpenChangeEmailPopup}
            email={email}
            handleChange={handleChange}
            validateEmail={validateEmail}
            onClickChangeEmail={onClickChangeEmail}
          /> */}
          <div className={styles.homeHeader}>
            <div className={styles.homeHeaderLeft}>
              <h1>{title || "Home"}</h1>
              <p className={styles.hearderSubHeading}>
                {profileData?.first_name !== undefined &&
                  `Welcome Back ${profileData?.first_name !== undefined
                    ? profileData?.first_name
                    : ""
                  }`}
              </p>
            </div>
            <div className={styles.homeHeaderRight}>
              <StyledSearchContainer
                className={!openSearchBox ? "hideSearchInput" : "showSearchInput"}
              >
                <InputBase
                  style={{ paddingLeft: "10px" }}
                  placeholder="Search..."
                  inputRef={searchInputRef}
                  value={searchValue}
                  onChange={({ target: { value } }) => setSearchValue(value)}
                />
                <MyButton onClick={searchBoxOpen}>
                  <SearchIcon style={{ paddingLeft: "0px" }} />
                </MyButton>

                <Button className="closeSearch" onClick={closeSearchBox}>
                  <CancelIcon />
                </Button>
              </StyledSearchContainer>
              {!hideProfile && (
                <Avatar
                  onClick={handleOpenDrawerMenu}
                  alt="Remy Sharp"
                  src={assest?.pf01}
                  sx={{ width: 50, height: 50 }}
                />
              )}
            </div>
          </div>
          {/* {
            open
              ?
              <div style={{ background: "#ffff", padding: "2%", border: "2px solid" }}>
                <h4>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <WarningIcon style={{ color: "red" }} />&nbsp;<span>{"Please check your email to verify your account."}</span></div>
                </h4>
                <div style={{ textAlign: "center", padding: "unset" }}>
                  <h4>{memberData?.email}</h4>
                </div>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                  <Button onClick={onClickChange}>Change</Button>
                  <Button onClick={onClickResend} >
                    Resend
                  </Button>
                </div>
              </div>
              :
              <div className={styles.homeHeader}>
                <div className={styles.homeHeaderLeft}>
                  <h1>{title || "Home"}</h1>
                  <p className={styles.hearderSubHeading}>
                    {profileData?.first_name !== undefined &&
                      `Welcome Back ${profileData?.first_name !== undefined
                        ? profileData?.first_name
                        : ""
                      }`}
                  </p>
                </div>
                <div className={styles.homeHeaderRight}>
                  <StyledSearchContainer
                    className={!openSearchBox ? "hideSearchInput" : "showSearchInput"}
                  >
                    <InputBase
                      style={{ paddingLeft: "10px" }}
                      placeholder="Search..."
                      inputRef={searchInputRef}
                      value={searchValue}
                      onChange={({ target: { value } }) => setSearchValue(value)}
                    />
                    <MyButton onClick={searchBoxOpen}>
                      <SearchIcon style={{ paddingLeft: "0px" }} />
                    </MyButton>

                    <Button className="closeSearch" onClick={closeSearchBox}>
                      <CancelIcon />
                    </Button>
                  </StyledSearchContainer>
                  {!hideProfile && (
                    <Avatar
                      onClick={handleOpenDrawerMenu}
                      alt="Remy Sharp"
                      src={assest?.pf01}
                      sx={{ width: 50, height: 50 }}
                    />
                  )}
                </div>
              </div>

          } */}



        </Box>
      </Slide>
    </>
  );
};
export default Header;
