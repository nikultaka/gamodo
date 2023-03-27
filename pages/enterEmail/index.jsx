import React, { useState } from "react";
import styles from "@/styles/pages/resetpassword.module.scss";
import assest from "@/json/assest";
import Image from "next/image";
import MailIcon from "@/ui/icons/MailIcon";
import SmsIcon from "@/ui/icons/SmsIcon";
import { Input, InputAdornment } from "@mui/material";
import * as yup from "yup";
import Link from "next/link";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import { useCallback } from "react";
import ResetPasswordConfirmation from "@/components/Popups/ResetPasswordConfirmation";
import IconModifier from "@/ui/IconModifier/IconModifier";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { postForgetPassword } from "@/reduxtoolkit/profile.slice";
import { useDispatch, useSelector } from "react-redux";
import useNotistack from "@/hooks/useNotistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please insert valid email"),
});

function index() {
  const { status } = useSelector((state) => state?.profile);
  const router = useRouter();
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const openResetPasswordConfirmationPopup = useCallback(() => {
    setOpenConfirmationPopup(true);
  }, []);
  const closeResetPasswordConfirmationPopup = useCallback(() => {
    setOpenConfirmationPopup(false);
  }, []);

  const routeToLoginWithSms = useCallback(() => {
    router.push("/login/sms");
  }, []);

  const [popUp, setpopUp] = useState(false);
  const { toastSuccess, toastError } = useNotistack();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const dispatch = useDispatch();
  const sendEmail = async (data) => {
    const input = {
      source: "external",
      email: data?.email,
    };
    dispatch(postForgetPassword(input)).then((res) => {
      if (res?.payload?.status?.error_code === 0) {
        setSuccessMsg(res?.payload?.status?.message);
        // toastSuccess(res?.payload?.status?.message);
        setpopUp(true);
      } else {
        toastError(res?.payload?.status?.message);
      }
    });
  };

  return (
    <>
      <div className={styles.resetpasswordPage}>
        <BackButton />
        <figure className={styles.rewardsLogo}>
          <Image
            loading="lazy"
            src={assest.Resetpassword}
            alt="rewards"
            height={143}
            width={171}
          />
        </figure>
        <div className="loginMainBody">
          <h1 className="cmsmianHeading">Reset Password</h1>
          <p className="shotdes">Type Your email to reset your password</p>
        </div>
        <form>
          <div className={styles.formInputGroup}>
            <div className={styles.formGroup}>
              <Input
                placeholder="Email Address"
                name="email"
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
                {...register("email")}
              />
              <p style={{ color: "red" }}>{errors?.email?.message}</p>
            </div>
          </div>
          <div
            className="primaryBtn"
            onClick={openResetPasswordConfirmationPopup}
          >
            <MyButton
              type="submit"
              onClick={handleSubmit(sendEmail)}
              disabled={status == "idle" ? false : true}
            >
              {status == "idle" && <MailIcon />}{" "}
              {status == "idle" ? "Send Email" : "Loading..."}
            </MyButton>
          </div>
        </form>
        <div className={styles.loginSms}>
          <p>Or if you have a registered phone</p>
          {/* <MyButton onClick={routeToLoginWithSms}>
            <SmsIcon /> Login with SMS
          </MyButton> */}
          <div className={styles.log_via_Smsbtn}>
            <MyButton onClick={routeToLoginWithSms}>
              <SmsIcon /> Login with SMS
            </MyButton>
          </div>
        </div>
      </div>
      {popUp && (
        <ResetPasswordConfirmation
          open={openConfirmationPopup}
          successMsg={successMsg}
          onClose={closeResetPasswordConfirmationPopup}
        />
      )}
    </>
  );
}

export default index;
