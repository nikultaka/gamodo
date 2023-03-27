import React from "react";
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
  profile_update,
  resetPassword,
} from "@/reduxtoolkit/profile.slice";
import useNotiStack from "@/hooks/useNotistack";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getHostName } from "@/lib/functions/_common.lib";
import { Cookies } from "react-cookie";
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
  new_password: yup.string().required("New password is required"),
  re_new_password: yup
    .string()
    .required("Re enter new password")
    .oneOf([yup.ref("new_password"), null], "Password doesn't match"),
});
const cookie = new Cookies();
function SetPassword() {
  const { status } = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = cookie.get("token");
  const { toastSuccess, toastError } = useNotiStack();
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [ischecked, setIschecked] = useState(true);
  const [OldPassShow, setOldPassShow] = React.useState(true);
  const [newPassShow, setNewPassShow] = React.useState(true);
  const [ReNewPassShow, setReNewPassShow] = React.useState(true);
  const openTermsandCondition = useCallback(() => {
    setOpenConfirmationPopup(true);
  }, []);
  const closeTermsandCondition = useCallback(() => {
    setOpenConfirmationPopup(false);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    if (data && ischecked == true && router?.query) {
      const userData = {
        source: "external",
        email: router?.query?.slug,
        reset_password_otp: router?.query?.OTP,
        password: data?.re_new_password,
      };
      dispatch(resetPassword(userData)).then((res) => {
        if (res?.payload?.status?.error_code == 0) {
          toastSuccess(res?.payload?.status?.message);
          reset({ old_password: "", new_password: "", re_new_password: "" });
          cookie.remove("token", { path: "/" });
          router.push("/login");
        } else {
          toastError(res?.payload?.status?.message);
        }
      });
    }
  };

  return (
    <div className={styles.pagePassword}>
      <BackButton onClick={() => router.push("/profile")} />
      <div className="commonTopTitle">
        <h3>Choose a Password</h3>
      </div>
      <div className="scrollSec">
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
                placeholder="Enter New Password"
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
                placeholder="Retype New Password"
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
              {ischecked != true ? (
                <StyledCheckBoxError
                  onClick={() => setIschecked(!ischecked)}
                  defaultChecked={ischecked}
                  checkedIcon={<CheckBoxOutlinedIcon />}
                />
              ) : (
                <StyledCheckBox
                  onClick={() => setIschecked(!ischecked)}
                  defaultChecked={ischecked}
                  checkedIcon={<CheckBoxOutlinedIcon />}
                />
              )}
              I Agree to the{" "}
              <Link href="/" onClick={openTermsandCondition}>
                Term & Conditions
              </Link>
            </p>
          </div>
          <TermsandCondition
            open={openConfirmationPopup}
            onClose={closeTermsandCondition}
          />
          <div className="test">
            <div
              className="primaryBtn profilebutton"
              style={{ marginBottom: "30px" }}
            >
              <MyButton
                onClick={handleSubmit(onSubmit)}
                disabled={status == "idle" ? false : true}
              >
                {status == "idle" ? "Reset password" : "Loading..."}
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetPassword;
