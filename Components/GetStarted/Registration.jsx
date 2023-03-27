import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/pages/login.module.scss";
import assest from "@/json/assest";
import Image from "next/image";
import LockIcon from "@/ui/icons/LockIcon";
import MailIcon from "@/ui/icons/MailIcon";
import LoginIcon from "@/ui/icons/LoginIcon";
import SmsIcon from "@/ui/icons/SmsIcon";
import {
  Checkbox,
  CircularProgress,
  Input,
  InputAdornment,
  styled,
} from "@mui/material";
import Link from "next/link";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import IconModifier from "@/ui/IconModifier/IconModifier";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useRouter } from "next/router";
import { Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clear_login_status, login } from "@/reduxtoolkit/profile.slice";
import ToastifyProvider from "@/ui/toastify/ToastifyProvider";
import useNotiStack from "@/hooks/useNotistack";
import { Cookies } from "react-cookie";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getHostName } from "@/lib/functions/_common.lib";

const StyledCheckBox = styled(Checkbox)`
  svg {
    path {
      fill: #1877f2;
    }
  }
`;

export function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.["token"];
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  return {
    props: {},
  };
}

const cookie = new Cookies();
function index() {
  const dispatch = useDispatch();
  const { toastSuccess, toastError } = useNotiStack();
  const [checkBoxVal, setCheckBoxVal] = useState(true);

  const [login_days, setLogin_days] = useState();
  const [passShow, setPassShow] = React.useState(true);
  const { login_status, login_msg, status } = useSelector(
    (state) => state?.profile
  );
  const { siteConfigs } = useSelector((state) => state.gamodoConfig);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const router = useRouter();

  const routeToLoginWithSms = useCallback(() => {
    router.push("/login/sms");
  }, []);
  const routeToHome = useCallback(() => {
    //for now it's home cause get started screen is on index, it will be replaced as per auth
    router.push("/home");
  }, []);

  const validation = () => {
    let error = {};
    if (!userData.email) {
      error.email = "Email is required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userData.email
      )
    ) {
      error.email = "Enter a valid email";
    }
    if (!userData.password) {
      error.password = "Password is required";
    }

    return error;
  };

  useEffect(() => {
    if (login_status == 0) {
      dispatch(clear_login_status(null));
    }
  }, [login_status]);

  useEffect(() => {
    if (login_status == 0) {
      toastSuccess("Login successfull");
    } else if (login_status == 1) {
      toastError(login_msg);
    }
  }, [login_status, login_msg]);

  //login function
  const login_func = () => {
    let ErrorList = validation();
    setError(validation());
    if (Object.keys(ErrorList).length !== 0) {
    } else {
      const data = {
        source: "external",
        email: userData.email,
        password: userData.password,
        device_type: 1,
        device_token: 215465,
        token_lifetime_in_days: checkBoxVal ? 7 : 1,
      };
      //   dispatch(login(data)).then((res) => {
      //     if (res?.payload?.status?.message == "Success") {
      //       if (checkBoxVal) {
      //         cookie.set("token", res?.payload?.result?.data?.token, {
      //           path: "/",
      //           maxAge: 604800, // Expires after 7 days
      //           sameSite: true,
      //         });
      //       } else {
      //         cookie.set("token", res?.payload?.result?.data?.token, {
      //           path: "/",
      //           maxAge: 86400, // Expires after 1 day
      //           sameSite: true,
      //         });
      //       }
      //       router.push("/home");
      //     }
      //   });
    }
  };

  return (
    <Fade in={true}>
      <div className={styles.pageLogin}>
        <figure className={styles.rewardsLogo}>
          <Image
            loading="lazy"
            src={siteConfigs?.profile_image}
            alt="rewards"
            height={90}
            width={200}
          />
        </figure>
        <div className="loginMainBody">
          <h1 className="cmsmianHeading">Login</h1>
          <p className="shotdes">Enter details to access your account</p>
          <div className={styles.formInputGroup}>
            <div className={styles.formGroup}>
              <Input
                type="email"
                name="email"
                value={userData.email}
                onChange={postUserData}
                placeholder="Email Address"
                startAdornment={
                  <InputAdornment position="start">
                    <IconModifier
                      variableName={"inputStartAdornmentColorgray"}
                      propertiesToChange={{
                        path: ["stroke"],
                        rect: ["stroke"],
                      }}
                    >
                      <MailIcon />
                    </IconModifier>
                  </InputAdornment>
                }
              />
              <div
                style={{ color: "red", marginTop: "5px", marginBottom: "5px" }}
              >
                {error.email}
              </div>
            </div>
          </div>

          {status == "idle" ? (
            <div className="primaryBtn">
              <MyButton onClick={login_func}>
                <LoginIcon /> Registration
              </MyButton>
            </div>
          ) : (
            <div className="primaryBtn">
              <MyButton disabled={true}>
                <LoginIcon /> Loading...
              </MyButton>
            </div>
          )}

          {/* <div className={styles.or}>
            <span>Or</span>
          </div>
          <div className={styles.log_via_Smsbtn}>
            <MyButton onClick={routeToLoginWithSms}>
              <SmsIcon /> Login with SMS
            </MyButton>
          </div>
          <div className={styles.loginTerms}>
            <p>
              Copyright © {siteConfigs?.site_name} {new Date().getFullYear()}.
              All Rights Reserved
            </p>
            {siteConfigs?.support_email && (
              <p>
                Support Email :{" "}
                <Link href={`mailto:${siteConfigs?.support_email}`}>
                  {siteConfigs?.support_email}
                </Link>
              </p>
            )}

            <p>
              Support Phone:
              <Link href={`tel:${siteConfigs?.support_phone}`}>
                {" "}
                {siteConfigs?.support_phone}
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </Fade>
  );
}

export default index;
