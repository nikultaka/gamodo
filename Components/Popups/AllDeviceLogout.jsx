import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import styles from "@/styles/components/resetpassword.module.scss";
import assest from "@/json/assest";
import Image from "next/image";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { all_device_logout } from "@/reduxtoolkit/profile.slice";
import { Cookies } from "react-cookie";
import useNotiStack from "@/hooks/useNotistack";

const cookie = new Cookies();
export default function AllDeviceLogout({ open, onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toastSuccess, toastError } = useNotiStack();
  const allDeviceLogout = () => {
    const data = {
      source: "external",
    };
    dispatch(all_device_logout(data))?.then((res) => {
      if (res?.payload?.status?.error_code == 0) {
        cookie.remove("token", { path: "/" });
        toastSuccess(res?.payload?.status?.message);
        router.push("/login");
      }
    });
  };
  return (
    <Dialog open={open} onClose={onClose} className={styles.dialogMain}>
      <DialogContent>
        {/* <figure>
          <Image
loading="lazy"
            
            src={assest.confirmMail}
            alt="rewards"
            height={116}
            width={184}
          />
        </figure> */}
        <p>Your password changed successfully</p>
        <div>
          <div className="primaryBtn">
            <button
              style={{ width: "100px", fontSize: "12px" }}
              onClick={() => {
                router.push("/profile"), onClose();
              }}
            >
              <p style={{ color: "white", fontSize: "10px" }}>Stay login</p>
            </button>
          </div>
          <div className="primaryBtn">
            <button
              style={{ fontSize: "12px", width: "100px" }}
              onClick={allDeviceLogout}
            >
              <p style={{ color: "white", fontSize: "10px" }}>
                Logout from other devices
              </p>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
