import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import styles from "@/styles/components/resetpassword.module.scss";
import assest from "@/json/assest";
import Image from "next/image";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import { useRouter } from "next/navigation";

export default function ResetPasswordConfirmation({
  open,
  onClose,
  successMsg,
}) {
  const router = useRouter();
  return (
    <Dialog open={open} onClose={onClose} className={styles.dialogMain}>
      <DialogContent>
        <figure>
          <Image
            loading="lazy"
            src={assest.confirmMail}
            alt="rewards"
            height={116}
            width={184}
          />
        </figure>
        <p>{successMsg}</p>
        <div className="primaryBtn">
          <MyButton
            onClick={() => {
              router.push("/login");
            }}
          >
            I Understand
          </MyButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
