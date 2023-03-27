import React, { useEffect } from "react";
import styles from "@/styles/pages/choosepassword.module.scss";
import assest from "@/json/assest";
import Image from "next/image";
import { Input, InputAdornment, styled } from "@mui/material";
import LockIcon from "@/ui/icons/LockIcon";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import IconModifier from "@/ui/IconModifier/IconModifier";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useCallback } from "react";
import { useState } from "react";
import * as yup from "yup";
import { Fade } from "@mui/material";
import TermsandCondition from "@/components/Popups/TermsandCondition";
import { useRouter } from "next/router";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  change_password,
  clear_registration_activation_status,
  profile_update,
  registration_activation,
} from "@/reduxtoolkit/profile.slice";
import useNotiStack from "@/hooks/useNotistack";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AllDeviceLogout from "@/components/Popups/AllDeviceLogout";
import { Cookies } from "react-cookie";
import { getHostName } from "@/lib/functions/_common.lib";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

const StyledCheckBox = styled(Checkbox)`
  svg {
    path {
      fill: #1877f2;
    }
  }
`;

const StyledCheckBoxError = styled(Checkbox)`
  svg {
    path {
      fill: red;
    }
  }
`;

const validationSchema = yup.object().shape({
  new_password: yup.string().required("Password is required"),
  re_new_password: yup
    .string()
    .required("Re enter password")
    .oneOf([yup.ref("new_password"), null], "Password doesn't match"),
});
const cookie = new Cookies();
function CreatePassword({ onNext, index }) {
  const { registration_activation_status, registration_activation_msg } =
    useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const router = useRouter();
  const { toastSuccess, toastError } = useNotiStack();
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const handleClose = () => {
    setPopup(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      ischecked: true,
    },
  });
  const [popup, setPopup] = useState(false);
  const [newPassShow, setNewPassShow] = React.useState(true);
  const [ReNewPassShow, setReNewPassShow] = React.useState(true);
  const openTermsandCondition = useCallback((e) => {
    e?.preventDefault()
    setOpenConfirmationPopup(true);
  }, []);
  const closeTermsandCondition = useCallback(() => {
    setOpenConfirmationPopup(false);
  }, []);

  useEffect(() => {
    if (
      registration_activation_status == 0 ||
      registration_activation_status == 1
    ) {
      dispatch(clear_registration_activation_status(null));
    }
  }, [registration_activation_status]);

  useEffect(() => {
    if (registration_activation_status == 0) {
      toastSuccess(registration_activation_msg);
    } else if (registration_activation_status == 1) {
      toastError(registration_activation_msg);
    }
  }, [registration_activation_status, registration_activation_msg]);

  const onSubmit = (data) => {
    if (data && data?.ischecked == true) {
      const userData = {
        source: "external",
        password: data?.new_password,
        device_type: 1,
        device_token: 2,
        user_token: router && router?.query?.slug,
      };
      dispatch(registration_activation(userData)).then((res) => {
        if (res?.payload?.status?.error_code == 0) {
          cookie.set("token", res?.payload?.result?.data?.token, {
            path: "/",
            sameSite: true,
          });
          // toastSuccess(res?.payload?.status?.message);
          reset({ old_password: "", new_password: "", re_new_password: "" });
          // cookie.remove("token", { path: "/" });
          // router.push("/profile");
          setPopup(true);
          onNext?.(index, index + 1);
        } else {
          // toastError(res?.payload?.status?.message);
        }
      });
    }
  };

  const goToNext = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [index, onNext, onSubmit, handleSubmit]);

  useEffect(() => {
    eventEmitter.on(events.stepper.forward, goToNext);
    return () => {
      eventEmitter.off(events.stepper.forward, goToNext);
    };
  }, [onNext]);

  return (
    <div className={styles.pagePassword}>
      {/* <BackButton onClick={() => router.push("/profile")} /> */}
      <div className="commonTopTitle">
        <h3>Choose a Password</h3>
      </div>
      <div className="scrollSec" style={{ height: "100vh" }}>
        <div className={styles.passwordWrapper}>
          <Image
            loading="lazy"
            src={assest.passwordBanner}
            alt="rewards"
            height={175}
            width={261}
          />
          <p>Create a password to keep your account secure</p>
          <div className={styles.inputPassword}>
            <div className={styles.formGroup}>
              <Input
                id="pass"
                placeholder="Password"
                name="new_password"
                type={newPassShow ? "password" : "text"}
                startAdornment={
                  <InputAdornment position="start">
                    <IconModifier
                      variableName={"inputStartAdornmentColorgray"}
                      propertiesToChange={{
                        path: ["stroke"],
                        rect: ["stroke"],
                      }}
                    >
                      <LockIcon />
                    </IconModifier>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment
                    position="end"
                    onClick={() => setNewPassShow(!newPassShow)}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {newPassShow ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("new_password")}
              />
              <div
                style={{
                  color: "red",
                  marginTop: "5px",
                  marginBottom: "5px",
                  textAlign: "left",
                }}
              >
                {errors?.new_password?.message}
              </div>
            </div>
            <div className={styles.formGroup}>
              <Input
                id="againPass"
                placeholder="Password (Again)"
                name="re_new_password"
                type={ReNewPassShow ? "password" : "text"}
                startAdornment={
                  <InputAdornment position="start">
                    <IconModifier
                      variableName={"inputStartAdornmentColorgray"}
                      propertiesToChange={{
                        path: ["stroke"],
                        rect: ["stroke"],
                      }}
                    >
                      <LockIcon />
                    </IconModifier>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment
                    position="end"
                    onClick={() => setReNewPassShow(!ReNewPassShow)}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {ReNewPassShow ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("re_new_password")}
              />
              <div
                style={{
                  color: "red",
                  marginTop: "5px",
                  marginBottom: "5px",
                  textAlign: "left",
                }}
              >
                {errors?.re_new_password?.message}
              </div>
            </div>
          </div>
          <div className={styles.agreeTerms}>
            <p>
              {watch("ischecked") ? (
                <StyledCheckBox
                  {...register("ischecked")}
                  name="ischecked"
                  checkedIcon={<CheckBoxOutlinedIcon />}
                  defaultChecked={watch("ischecked")}
                />
              ) : (
                <StyledCheckBoxError
                  {...register("ischecked")}
                  name="ischecked"
                  checkedIcon={<CheckBoxOutlinedIcon />}
                />
              )}
              I Agree to the{" "}
              <a href="#" onClick={openTermsandCondition}>
                Term & Conditions
              </a>
            </p>
          </div>
          <TermsandCondition
            open={openConfirmationPopup}
            onClose={closeTermsandCondition}
          />
          {/* <div className="test">
            <div
              className="primaryBtn profilebutton"
              style={{ marginBottom: "30px" }}
            >
              <MyButton onClick={handleSubmit(onSubmit)}>
                Register
              </MyButton>
            </div>
          </div> */}
        </div>
      </div>
      {/* {<AllDeviceLogout open={popup} onClose={handleClose} />} */}
    </div>
  );
}

export default CreatePassword;
