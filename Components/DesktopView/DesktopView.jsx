import MyButton from "@/ui/Buttons/MyButton/MyButton";
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  Grid,
  List,
  ListItem,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/ui/Loaders/Loader";
import { profile_data } from "@/reduxtoolkit/profile.slice";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import QrCodeSharpIcon from "@mui/icons-material/QrCodeSharp";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Stack } from "@mui/system";
import assest from "@/json/assest";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import { QRCode } from "react-qrcode-logo";
import { getHostName } from "@/lib/functions/_common.lib";
import { Cookies } from "react-cookie";
import { useMutation } from "react-query";
import axiosInstance, { getSiteHostName } from "@/axios/authAxiosInstance";
import { useSnackbar } from "notistack";

const StyledDesktopContainer = styled(Box)`
  padding: 50px 0;

  /* min-height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(103, 58, 183, 1),
    rgba(255, 87, 34, 1),
    rgba(103, 58, 183, 1),
    rgba(255, 87, 34, 1)
  );
  :before {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: var(--desktopBackgroundImage) no-repeat scroll center
      bottom/cover;

    z-index: -1;
  }
  background-size: 500% 500%;
  animation: Gradient 50s ease infinite;
  position: relative;
  z-index: 1;
  display: flex;
  overflow: hidden;
  align-items: center; */

  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  // @media (max-width: 1024px) {
  //   width: 100vw;
  //   height: 100vh;
  //   max-width: 100%;
  //   .MuiBox-root {
  //     padding: 0;
  //     width: 100vw;
  //     height: 100vh;
  //     max-width: 100%;

  //     .MuiGrid-container {
  //       margin: 0;
  //       .left-col {
  //         display: none;
  //       }
  //       .right-col {
  //         width: 100%;
  //         height: 100%;
  //         max-width: 100%;
  //         padding: 0;
  //         .MuiBox-root {
  //           padding: 0;
  //           border-radius: 0;
  //           margin: 0;
  //           .notch {
  //             display: none;
  //           }
  //           .iframe-wrapper {
  //             border-radius: 0;
  //             iframe {
  //               border-radius: 0;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
`;

const StyledBtnGroup = styled(Stack)`
  padding-top: 30px;

  .btnPrimary {
    margin-right: 20px;
    .MuiButtonBase-root {
      background-color: var(--btnColorOne);
      color: var(--homeHeader);
    }
  }

  .btnblack {
    .MuiButtonBase-root {
      background-color: var(--btnColorTwo);
      color: #fff;

      svg {
        fill: #fff;
      }
    }
  }

  .MuiButtonBase-root {
    border-radius: 10px;
    font-weight: 500;
    font-size: 16px;
    padding: 10px 30px;
    svg {
      margin-right: 8px;
    }
  }
`;

const StyledPhoneCase = styled(Box)`
  z-index: 1;
  height: 665px;
  width: 380px;
  padding: 10px 7px;
  border-radius: 20px;
  background: #d9dee3;
  position: relative;
  overflow: hidden;
  transition: 0.3s linear all;
  margin-left: auto;
  box-shadow: 0 0 20px 10px rgb(0 0 0 / 20%);
  &.blurred {
    transform: rotate(-15deg);
    filter: grayscale(1);
    iframe {
      pointer-events: none !important;
      user-select: none !important;
    }
  }

  .notch {
    position: absolute;
    height: 0.6rem;
    width: 28%;
    background-color: #d9dee3;
    z-index: 999999999;
    right: 50%;
    transform: translate(50%, -5%);
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
  .iframe-wrapper {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    height: 100%;
    width: 100%;
    iframe {
      pointer-events: auto;
      border-radius: 12px;
      height: 100%;
      width: 100%;
    }
  }
`;

const StyledLeftCol = styled(Box)`
  /* display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 1.5rem;
  font-family: SFProText; */
  .MuiTypography-h1 {
    line-height: 1.5;
    color: var(--commonTextColor);
    margin-bottom: 20px;
  }

  .MuiTypography-body1 {
    font-size: 24px;
    color: var(--commonTextColor);
    max-width: 450px;
  }

  .MuiList-root {
    padding: 20px 0;

    .MuiListItem-root {
      font-size: 16px;
      color: var(--commonTextColor);

      svg {
        fill: #1877f2;
        margin-right: 5px;
      }
    }
  }
  /* h1 {
    font-size: 42px;
    font-weight: 900;
    line-height: 1;
    transition: all 0.2s ease-in-out;
    color: var(--commonTextColor);
  }
  span {
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.2;
    transition: all 0.2s ease-in-out;
    color: var(--commonTextColor);
  } */
  .action-buttons {
    display: flex;
    gap: 1rem;
    .primaryBtn {
      button {
        width: 180px;
        padding: 12px 15px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .install-button {
      button {
        background-color: var(--commonTextColor);
        color: var(--bodyBackground);
        gap: 0.4rem;
        svg {
          font-size: 20px;
          path {
            fill: var(--bodyBackground);
          }
        }
      }
    }
  }
`;

const AppDownloadSec = styled(Box)`
  margin-top: 50px;

  .dark-mode {
    &::before {
      filter: invert(100%) sepia(2%) saturate(7%) hue-rotate(19deg)
        brightness(102%) contrast(100%);
    }
  }

  .MuiTypography-h2 {
    color: var(--commonTextColor);
  }
`;

const QrWrap = styled(Stack)`
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    background: url(/assets/images/jm-arrow.png) no-repeat center right 250px;
    background-size: 507px 56px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .leftQr {
    z-index: 11;
    .MuiTypography-h3 {
      font-size: 50px;
      max-width: 400px;
      margin-bottom: 20px;
      color: var(--commonTextColor);
    }

    .MuiTypography-body2 {
      font-size: 16px;
      max-width: 400px;
      color: var(--commonTextColor);
    }
  }
  .rightQr {
    pointer-events: none;
    z-index: 11;
    figure {
      background: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.26);
      border-radius: 10px;

      canvas {
        border-radius: 10px;
      }
    }
  }
`;
const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    width: fit-content !important;
    background-color: var(--bodyBackground);
    border-radius: 20px;
  }
  .MuiDialogContent-root {
    pointer-events: none;
    user-select: none;
    text-align: center;
    padding: 10px 10px;
    canvas {
      border-radius: 15px;
    }
    p {
      font-weight: bold;
      font-size: 14px;
      color: var(--commonTextColor);
    }
  }
`;
const cookie = new Cookies();
export default function DesktopView({ url }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { currentTheme, availableThemes } = useGamodoTheme();
  const { siteConfigs } = useSelector((state) => state.gamodoConfig);
  const { profileData } = useSelector((state) => state?.profile);
  const [openQrDialog, setOpenQrDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile_data({ source: "external" }));
  }, []);

  const qrLink =
    "https://members." + getSiteHostName() + "/login/" + cookie.get("token");

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () =>
      axiosInstance.post("sendLoginLinkViaSMS", {
        source: "external",
      }),
  });
  const { enqueueSnackbar } = useSnackbar();
  const loginViaSms = useCallback(() => {
    mutateAsync()
      .then((response) => {
        if (response?.status?.message) {
          enqueueSnackbar(response?.status?.message, {
            variant: "success",
          });
        }
      })
      .catch((e) => {
        enqueueSnackbar(e?.status?.message || "Something went wrong", {
          variant: "error",
        });
      });
  }, []);

  return (
    <StyledDesktopContainer>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={6} className={"left-col"}>
            <StyledLeftCol>
              <Image
                loading="lazy"
                src={siteConfigs?.profile_image}
                alt="Company Logo"
                height={100}
                width={200}
                style={{
                  objectFit: "contain",
                }}
              />
              {/* <h1>{siteConfigs?.site_name}</h1> */}
              <Typography variant="h1">
                Welcome {profileData?.first_name}, Enjoy your membership with
                the full mobile experience.
              </Typography>
              <Typography variant="body1">
                You have access to hundreds of games and prizes.
              </Typography>
              <List>
                <ListItem>
                  <CheckSharpIcon /> Casino Games
                </ListItem>
                <ListItem>
                  <CheckSharpIcon /> Word Games/ Puzzles
                </ListItem>
                <ListItem>
                  <CheckSharpIcon /> Brain Teasers
                </ListItem>
                <ListItem>
                  <CheckSharpIcon /> Arcade Games
                </ListItem>
                <ListItem>
                  <CheckSharpIcon /> Sports Games
                </ListItem>
              </List>
              <Typography variant="body1">
                Get instant access on your phone with one of the options below.
              </Typography>
              <StyledBtnGroup direction="row">
                <Box className="btnPrimary">
                  <MyButton
                    isLoading={isLoading}
                    onClick={loginViaSms}
                    loadingText="Sending..."
                  >
                    <TextsmsOutlinedIcon />
                    Link Via SMS
                  </MyButton>
                </Box>
                <Box
                  className="btnblack"
                  onClick={() => {
                    setOpenQrDialog(true);
                  }}
                >
                  <MyButton>
                    <QrCodeSharpIcon />
                    Try on Your Phone
                  </MyButton>
                </Box>
              </StyledBtnGroup>
            </StyledLeftCol>
          </Grid>
          <Grid item xs={6} className={"right-col"}>
            <StyledPhoneCase>
              <span className="notch"></span>
              <div className="iframe-wrapper">
                <Loader open={!iframeLoaded} position={"absolute"} />
                <iframe
                  onLoad={() => {
                    setIframeLoaded(true);
                  }}
                  frameBorder={0}
                  src={url}
                  title={"iframeApp"}
                  id={"iframeApp"}
                />
              </div>
            </StyledPhoneCase>
          </Grid>
        </Grid>
        <AppDownloadSec>
          <Typography variant="h2">
            No App to Download. 100% Secure and Private
          </Typography>
          <QrWrap
            direction="row"
            className={`${
              currentTheme === availableThemes.darkTheme
                ? "dark-mode"
                : "light-mode"
            }`}
          >
            <Box className="leftQr">
              <Typography variant="h3">Try it on Your Mobile Device</Typography>
              <Typography variant="body2">
                Scan to view on your phone's camera to access Scan to view on
                your phones device
              </Typography>
            </Box>
            <Box className="rightQr">
              <figure>
                <QRCode
                  value={qrLink}
                  // logoImage={siteConfigs?.profile_image}
                  size={200}
                />
              </figure>
            </Box>
          </QrWrap>

          <StyledDialog
            open={openQrDialog}
            onClose={() => {
              setOpenQrDialog(false);
            }}
          >
            <DialogContent>
              <QRCode
                value={qrLink}
                // logoImage={siteConfigs?.profile_image}
                size={200}
              />
              <p>Scan this QR</p>
            </DialogContent>
          </StyledDialog>
        </AppDownloadSec>
      </Container>
    </StyledDesktopContainer>
  );
}
