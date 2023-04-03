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
import AuthenticatePop from "../Components/Popups/AuthenticatePopup";
import CancelIcon from '@mui/icons-material/Cancel';


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

  // useEffect(() => {
  //   if (!isAuthenticate) {
  //     setOpen(true)
  //   } else {
  //     setOpen(false)
  //   }

  // }, [isAuthenticate]);



  const updateStatus = (status) => {
    let ind = rewardList?.findIndex((e) => e.status == 'pending')
    if (ind >= 0) {
      let lst = [...rewardList]
      lst[ind].status = status
      setRewardList(lst)
    }

  }



  useEffect(() => {


    if (rewardList.filter((e) => e.status === 'verified').length < 6) {
      const interval = setInterval(() => updateStatus('verified'), 1000);
      return () => {
        clearInterval(interval);
      };
    } else {

      // console.log(authenticateData)

      let payload = {
        source: "external",
        email: authenticateData?.email,
        ip_address: authenticateData?.ip,
        token: authenticateData?.token,
      }

      if (authenticateData && authenticateData?.email) {


        dispatch(verify_member(payload)).then((res) => {
          if (res?.payload?.status?.error_code == 0) {
            console.log('done')
            updateStatus('verified')
          } else {
            console.log('err')
            updateStatus('rejected')
          

          }
        });

      } else {
        updateStatus('rejected')

      }


    }
  }, [rewardList]);

  useEffect(() => {
    var completedCount = 0;
    var total = 0;

    rewardList.forEach((task) => {
      if (task.status == "verified") {
        completedCount++;
      }
      total++;
    });
    var percentage = (completedCount / total) * 100;
    setRatio(Math.round(percentage))

  }, [rewardList]);


  const memoList = useMemo(() => rewardList.map(list => {
    return (
      <li class="verifying-list__item" >
        <div class="icon-circle">
          {
            list.status === 'rejected' ?
              <>
                <CancelIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "red",
                    visibility: list.status === 'pending' ? "hidden" : "visible"
                  }}
                />
              </>
              :
              <CheckCircleIcon
                style={{
                  width: 20,
                  height: 20,
                  color: "green",
                  visibility: list.status === 'pending' ? "hidden" : "visible"
                }}
              />

          }
        </div>
        <p className={list.status + "-varification-text"}>{list.label}</p>
      </li>
    )
  }), [rewardList])



  return (
    <Wrapper>
      <AuthenticatePop memoList={memoList} updateStatus={updateStatus} ratio={ratio} />
    </Wrapper>
  );
}


