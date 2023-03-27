import React, {
  useRef,
  useCallback,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Snackbar, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import assest from "@/json/assest";
import Image from "next/image";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const StyledSnackbar = styled(Snackbar)`
  margin: 10px auto;
  width: 90%;
  max-width: 90%;
  .MuiBox-root {
    position: relative;
    border-radius: 10px;
    padding: 10px 20px;
    width: 100%;
    background-color: var(--productCardBg);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);

    p {
      font-weight: 400;
      font-size: 12px;
      color: var(--commonTextColor);
    }

    .notificationHeader {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .rewardsLogo {
        margin-right: 10px;
      }

      p {
        span {
          display: inline-block;
          padding-left: 5px;
          font-size: 10px;
          color: #1877f2;
        }
      }
    }

    .mainContent {
      h4 {
        font-weight: 500;
        font-size: 14px;
        color: var(--commonTextColor);
        margin-bottom: 5px;
      }
    }
    .closeAction {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 0;
      min-width: 1px;
      justify-content: flex-end;
      svg {
        font-size: 20px;
        fill: #a9acb2;
      }
    }
  }
`;
function NotificationPopup() {
  const { siteConfigs } = useSelector((state) => state?.gamodoConfig);
  const [open, setOpen] = useState(true);
  const timeoutRef = useRef(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) {
      timeoutRef.current = setTimeout(() => {
        handleOpen();
      }, 2000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);

  return (
    <StyledSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      TransitionComponent={Transition}
    >
      <Box>
        <div className={"notificationHeader"}>
          <figure className={"rewardsLogo"}>
            <Image
              loading="lazy"
              src={siteConfigs?.profile_image}
              alt="rewards"
              height={24}
              width={39}
            />
          </figure>
          <p>
            {siteConfigs?.site_name} <span>Just Now</span>
          </p>
        </div>
        <div className={"mainContent"}>
          <h4 style={{ display: "none" }}>Coupons</h4>
          <p style={{ display: "none" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <Button onClick={handleClose} className={"closeAction"}>
          <CancelIcon />
        </Button>
      </Box>
    </StyledSnackbar>
  );
}

export default NotificationPopup;
