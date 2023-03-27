import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/styles/pages/sms.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import SendIcon from "@/ui/icons/SendIcon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import CheckIcon from "@mui/icons-material/Check";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { Fade } from "@mui/material";
import {
  postOTPLogInCode,
  postSendLogInCode,
} from "@/reduxtoolkit/profile.slice";
import { useDispatch } from "react-redux";
import useNotistack from "@/hooks/useNotistack";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
const ProcessStates = {
  otp: "otp",
  phone: "phone",
};
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

const cookie = new Cookies();
export default function sms() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toastSuccess, toastError } = useNotistack();
  const [processState, setProcessState] = useState(ProcessStates.phone);
  const [resend_otp_time, setResend_otp_time] = useState(59);
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [show_num, setShow_num] = useState(null);
  const [numFormat, setNumFormat] = useState("");

  const SubmitButtonContent = useMemo(() => {
    if (processState === ProcessStates.phone) {
      return (
        <>
          <SendIcon /> Send SMS Code
        </>
      );
    }
    if (processState === ProcessStates.otp) {
      return (
        <>
          <CheckIcon /> Verify Now
        </>
      );
    }
  }, [processState]);

  var timer;
  useEffect(() => {
    if (processState == "otp") {
      timer = setInterval(() => {
        if (resend_otp_time > 0) setResend_otp_time(resend_otp_time - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resend_otp_time, processState]);

  const sendData = () => {
    if (processState == "phone") {
      const data = {
        source: "external",
        phone: value,
        type: "R",
      };
      dispatch(postSendLogInCode(data)).then((res) => {
        if (res?.payload?.status?.error_code == 0) {
          toastSuccess(res?.payload?.status?.message);
          setProcessState(ProcessStates.otp);
        } else {
          toastError(res?.payload?.status?.message);
        }
      });
    } else {
      const data = {
        source: "external",
        phone: value,
        otp: otp,
        device_type: 1,
        device_token: 215465,
      };
      dispatch(postOTPLogInCode(data)).then((res) => {
        if (res?.payload?.status?.error_code === 0) {
          toastSuccess("Successfully logged in");
          cookie.set("token", res?.payload?.result?.data?.token, {
            path: "/",
            maxAge: 86400, // Expires after 1 day
            sameSite: true,
          });
          router.push("/home");
        } else {
          toastError("Invalid verification code. Please try again");
        }
      });
    }
  };

  const handleOnchange = (value, data) => {
    setValue(value.slice(data.dialCode.length));
    setShow_num(data?.dialCode);
    setNumFormat(data?.format?.replace(/\./g, "*"));
  };

  const resend_otp = () => {
    const data = {
      source: "external",
      phone: value,
      type: "R",
    };
    dispatch(postSendLogInCode(data))?.then((res) => {
      if (res?.payload?.status?.error_code === 0) {
        toastSuccess(res?.payload?.status?.message);
        setProcessState(ProcessStates.otp);
        setResend_otp_time(59);
      } else {
        toastError(res?.payload?.status?.message);
      }
    });
  };

  return (
    <Fade in={true}>
      <div className={styles.pageLoginSms}>
        <BackButton onClick={() => router.back()} />
        <div className="loginMainBody">
          <h1 className="cmsmianHeading">
            {processState === ProcessStates.phone
              ? "Login with SMS"
              : "Verification Code"}
          </h1>
          <p className="shotdes">
            {processState === ProcessStates.phone
              ? "Please enter your mobile number to verify your account"
              : `Please type the verification code send to +${show_num}${value}`}
          </p>
        </div>

        {processState === ProcessStates.phone && (
          <Fade in={true}>
            <div className={styles.showSelectCountry}>
              <PhoneInput
                country={"us"}
                disableDropdown
                onChange={(value, data) => handleOnchange(value, data)}
                countryCodeEditable={false}
              />
            </div>
          </Fade>
        )}
        {processState === ProcessStates.otp && (
          <Fade in={true}>
            <div className={styles.inputOtp}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus
                separator={<span></span>}
                className="inputStyle"
                isInputNum
              />
            </div>
          </Fade>
        )}
        <div className="primaryBtn">
          {processState == "phone" ? (
            <MyButton
              onClick={
                sendData
                // setProcessState(ProcessStates.otp);
              }
              disabled={value ? false : true}
            >
              {SubmitButtonContent}
            </MyButton>
          ) : (
            <MyButton
              onClick={
                sendData
                // setProcessState(ProcessStates.otp);
              }
              disabled={otp?.length == 6 ? false : true}
            >
              {SubmitButtonContent}
            </MyButton>
          )}
        </div>

        {processState === ProcessStates.otp && (
          <Fade in={true}>
            <div className={styles.resendAction}>
              {resend_otp_time > 0 ? (
                <span>Resend Code</span>
              ) : (
                <span
                  onClick={resend_otp}
                  style={{ cursor: "pointer", color: "#1877f2" }}
                >
                  Resend Code
                </span>
              )}

              <b>{resend_otp_time > 0 && resend_otp_time}</b>
            </div>
          </Fade>
        )}
      </div>
    </Fade>
  );
}
