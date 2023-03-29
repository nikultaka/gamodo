//* *  PROJECT IMPORTS   */
import dynamic from "next/dynamic";
import { arrayOf, number, oneOfType, shape, string } from "prop-types";
import React, { useEffect } from "react";
import GetProductDataList, {
  GetCommingsoonmoviesDataList,
  GetdealsonAmazonDataList,
  GetdealsonTargetDataList,
  GetdealsonWalmartDataList,
  GetDashboardData,
  GetCatGameData,
  GetAllCatGames,
  GetBlogsFullDataList,
} from "@/api/functions/GetProductDataList";
import { Cookies } from "react-cookie";
import styles from "@/styles/pages/home.module.scss";
import { useSnackbar } from "notistack";
import { notiStackType } from "@/config/Notistack.config";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import assest from "@/json/assest";
import WatchTrailers from "@/components/WatchTrailers/WatchTrailers";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import GamesCard from "@/components/ProductCard/GamesCard";
import TargetdealCard from "@/components/ProductCard/TargetdealCard";
import AmazondealsCard from "@/components/ProductCard/AmazondealsCard";
import WalmartCard from "@/components/ProductCard/WalmartCard";
import BlogCard from "@/components/ProductCard/BlogCard";
import EbooksCard from "@/components/ProductCard/EbooksCard";
import UpcommingMoviesCard from "@/components/ProductCard/UpcommingMoviesCard";
import { useQuery } from "react-query";
import response from "@/json/response";
import { useDispatch, useSelector } from "react-redux";
import { getMyFavourite } from "@/reduxtoolkit/profile.slice";
import {
  Skeleton_home_blogs,
  Skeleton_search,
  Skeleton_upcomingMovies,
} from "@/components/Skeleton/Skeleton";
import { Fade, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

//* *  DYNAMIC IMPORTS   */
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import LinearProgress, {
  linearProgressClasses
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { verify_member } from "@/reduxtoolkit/profile.slice";

const Wrapper = dynamic(() => import("@/layout/Wrappers/Wrapper"), {
  ssr: false,
});

// const cookie = new Cookies();
export default function Home_() {
  const { isAuthenticate, authenticateData, memberData, member_verify_status } = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  // const token = cookie.get("token");
  const [open, setOpen] = React.useState(false);
  const [ratio, setRatio] = React.useState(0);

  const [rewardList, setRewardList] = React.useState([
    {
      label: "50 casino games",
      status: "pending"
    },
    {
      label: "25 puzzel challanges",
      status: "pending"
    },
    {
      label: "Daily trivia contests",
      status: "pending"
    },
    {
      label: "Walmart, Target, Amazon deals",
      status: "pending"
    },
    {
      label: "Upcoming movie trailers",
      status: "pending"
    },
    {
      label: "Ip address check",
      status: "pending"
    },
    {
      label: "Email address verified",
      status: "pending"
    },

  ]);

  useEffect(() => {
    if (!isAuthenticate) {
      setOpen(true)
    } else {
      setOpen(false)
    }

  }, [isAuthenticate]);

  // console.log(authenticateData)



  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    // borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      // borderRadius: 5,
      backgroundColor: "black"
    }
  }));

  const updateStatus = () => {
    let ind = rewardList?.findIndex((e) => e.status == 'pending')
    if (ind >= 0) {
      let lst = [...rewardList]
      lst[ind].status = 'verified'
      setRewardList(lst)
    }

  }

  const lst = () => {
    return rewardList

  }


  useEffect(() => {

    const interval = setInterval(() => updateStatus(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const lsts = useMemo(() => rewardList, [rewardList]);


  const AuthenticatePop = () => {

    const handleClose = () => {

    }

    return (
      <div>

        <Dialog
          open={true}
          TransitionComponent={Transition}
          fullWidth={true}
          maxWidth={'sm'}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            backdropFilter: "blur(5px)",
            //other styles here
          }}
        >

          {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent style={{ textAlign: "center" }}>
            <Image
              loading="lazy"
              src={assest.DailyRewards}
              alt="rewards"
              height={100}
              width={100}
              style={{
                objectFit: "contain"
              }}
            />
            <h5 style={{ marginBottom: "5%" }}>{"Creating your account"}</h5>
            <div style={{ textAlign: "end", marginBottom: "2%" }}>
              <span>{ratio}%</span>
            </div>
            <BorderLinearProgress variant="determinate" value={ratio} />
            <div style={{ marginTop: "10%", paddingBottom: "0px" }}>
              <ul class="verifying-list" style={{ textAlign: "start" }}>
                {
                  lsts.map((list, i) => {
                    return (
                      <>
                        <li class="verifying-list__item" >
                          <div class="icon-circle">
                            <CheckCircleIcon style={{
                              width: 20,
                              height: 20,
                              color: "green",
                              visibility: list.status === 'pending' ? "hidden" : "visible"
                            }} />
                          </div>
                          <p className={list.status + "-varification-text"}>{list.label}</p>
                        </li>
                      </>
                    )
                  })

                }
                {/* <li class="verifying-list__item" >
                  <div class="icon-circle">
                    <CheckCircleIcon style={{
                      width: 20,
                      height: 20,
                      color: "green"
                    }} />
                  </div>
                  <p>50 casino games</p>
                </li>
                <li class="verifying-list__item">
                  <div class="icon-circle">
                    <CheckCircleIcon style={{
                      width: 20,
                      height: 20,
                      color: "green"
                    }} />
                  </div>
                  <p>25 puzzel challanges</p>
                </li>
                <li class="verifying-list__item">
                  <div class="icon-circle">
                    <CheckCircleIcon style={{ visibility: "hidden" }} />
                  </div>
                  <p className="pending-varification-text">Daily trivia contests</p>
                </li>
                <li class="verifying-list__item">
                  <div class="icon-circle">
                    <CheckCircleIcon style={{ visibility: "hidden" }} />
                  </div>
                  <p className="pending-varification-text">Walmart, Target, Amazon deals</p>
                </li>
                <li class="verifying-list__item">
                  <div class="icon-circle">
                    <CheckCircleIcon style={{ visibility: "hidden" }} />
                  </div>
                  <p className="pending-varification-text">Upcoming movie trailers</p>
                </li>
                <li class="verifying-list__item">
                  <div class="icon-circle">
                    <CheckCircleIcon style={{ visibility: "hidden" }} />
                  </div>
                  <p className="pending-varification-text">Ip address check</p>
                </li>
                <li class="verifying-list__item">
                  <div class="icon-circle">
                    <CheckCircleIcon style={{ visibility: "hidden" }} />
                  </div>
                  <p className="pending-varification-text">Email address verified</p>
                </li> */}
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: 700 }}>We cannot verify your account at this time. Please check your email for an activation link from:</p>
              <h3 style={{ marginTop: "10px" }}>support@dailyrewards.me</h3>

            </div>
            <div className="primaryBtn home_primarybtn" style={{ marginTop: "15px" }} >
              <MyButton

              // onClick={() => onClickBtn()}
              >
                <strong>RETRY</strong>
              </MyButton>
            </div>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions> */}
        </Dialog>
      </div>
    );


  }

  return (
    <Wrapper>
      <AuthenticatePop />
    </Wrapper>
  );
}

//*   Proptype check
