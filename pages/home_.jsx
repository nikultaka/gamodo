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

const Wrapper = dynamic(() => import("@/layout/Wrappers/Wrapper"), {
  ssr: false,
});

const cookie = new Cookies();
export default function Home() {
  const { favourite_list, isAuthenticate } = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const token = cookie.get("token");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!isAuthenticate) {
      setOpen(true)
    } else {
      setOpen(false)
    }

  }, [isAuthenticate]);

  useEffect(() => {
    cookie.set("isFirst", false, {
      path: "/",
      sameSite: true,
    });
  }, []);

  useEffect(() => {
    const data = {
      source: "external",
      image_size: "THUMBNAIL",
      start_page: "all",
    };
    dispatch(getMyFavourite(data));
  }, []);

  const {
    data: CommingsoonmoviesDataList,
    isLoading: CommingsoonmoviesDataListLoading,
  } = useQuery(
    "GetCommingsoonmoviesDataList",
    async () => {
      return GetCommingsoonmoviesDataList({
        token: token,
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  const { data: DealsontargetData, isLoading: DealsontargetDataLoading } =
    useQuery(
      "GetDealsontargetData",
      async () => {
        return GetdealsonTargetDataList({
          token: token,
        });
      },
      {
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
      }
    );

  const { data: BlogsData, isLoading: BlogsDataLoading } = useQuery(
    "GetBlogsFullDataList",
    async () => {
      return GetBlogsFullDataList({
        token: token,
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  const { data: DealsonAmazonData, isLoading: DealsonAmazonDataLoading } =
    useQuery(
      "GetDealsonAmazonData",
      async () => {
        return GetdealsonAmazonDataList({
          token: token,
        });
      },
      {
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
      }
    );

  const { data: DealsonWalmartData, isLoading: DealsonWalmartDataLoading } =
    useQuery(
      "GetDealsonWalmartData",
      async () => {
        return GetdealsonWalmartDataList({
          token: token,
        });
      },
      {
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
      }
    );

  const {
    data: comingNextMonthGameListData,
    isLoading: comingNextMonthGameListDataLoading,
  } = useQuery(
    "comingNextMonthGameListData",
    async () => {
      return GetAllCatGames({
        token: token,
        type: "coming-next-month",
        source: "external",
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: recentlyPlayedGameListData,
    isLoading: recentlyPlayedGameListDataLoading,
  } = useQuery(
    "recentlyPlayedGameListData",
    async () => {
      return GetAllCatGames({
        token: token,
        type: "recently-played",
        source: "external",
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );


  const { data: featuredGameListData, isLoading: featuredGameListDataLoading } =
    useQuery(
      "featuredGameListData",
      async () => {
        return GetAllCatGames({
          token: token,
          type: "featured-games",
          source: "external",
        });
      },
      {
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
      }
    );

  const {
    data: newReleaseGameListData,
    isLoading: newReleaseGameListDataLoading,
  } = useQuery(
    "newReleaseGameListData",
    async () => {
      return GetAllCatGames({
        token: token,
        type: "new-releases",
        source: "external",
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: popularNowGameListData,
    isLoading: popularNowGameListDataLoading,
  } = useQuery(
    "popularNowGameListData",
    async () => {
      return GetAllCatGames({
        token: token,
        type: "what's-popular-now",
        source: "external",
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2.2,
          // slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  var trailers = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.05,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  var blogs = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  var ebooks = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  var upcomingmovies = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const couponsData = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product01,
        isFav: true,
        discount: 80,
        category: "Target",
        expiryDate: "31 Oct,2001",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product02,
        discount: 50,
        category: "Target",
        expiryDate: "31 Oct,2001",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product03,
        discount: 25,
        category: "Target",
        expiryDate: "31 Oct,2001",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product01,
        discount: 20,
        category: "Target",
        expiryDate: "31 Oct,2001",
      },
    ];
  }, []);

  const upcommingMoviesData = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Avatar: The Way of Water",
        image: assest.movie01,
        releaseDate: "12/15/2022",
      },
      {
        id: Math.random(),
        name: "The Batman",
        image: assest.movie02,
        releaseDate: "12/15/2022",
      },
      {
        id: Math.random(),
        name: "John Wick",
        image: assest.movie03,
        releaseDate: "12/15/2022",
      },
      {
        id: Math.random(),
        name: "Avatar: The Way of Water",
        image: assest.movie01,
        releaseDate: "12/15/2022",
      },
    ];
  }, []);

  // const gamesData = useMemo(() => {
  //   return [
  //     {
  //       id: Math.random(),
  //       name: "Subway Surfer",
  //       image: assest.product04,
  //       category: "Sports,Arcade Fun",
  //     },
  //     {
  //       id: Math.random(),
  //       name: "Snipper Fury",
  //       image: assest.product05,
  //       category: "Sports,Arcade Fun",
  //     },
  //     {
  //       id: Math.random(),
  //       name: "Needs for speed",
  //       image: assest.product06,
  //       isFav: true,
  //       discount: 20,
  //       expiryDate: "10/31",
  //     },
  //     {
  //       id: Math.random(),
  //       name: "Subway Surfer",
  //       image: assest.product04,
  //       expiryDate: "10/31",
  //     },
  //   ];
  // }, []);

  const todaysDeals = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Cafe Escapes Chai",
        image: assest.product01,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai",
        image: assest.product02,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Needs for speed",
        image: assest.product06,
        category: "Sports,Racing",
        discount: 20,
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        isFav: true,
        name: "Subway Surfer",
        image: assest.product04,
        expiryDate: "10/31",
        category: "Sports,Arcade Fun",
      },
    ];
  }, []);

  const blogCards = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Pubg mobile launches version 2.0 update with evangelion's iconic angel",
        date: "Oct 11, 2022",
        image: assest.blog01,
        isFav: true,
      },
      {
        id: Math.random(),
        name: "Pubg mobile launches version 2.0 update with evangelion's iconic angel",
        date: "Oct 11, 2022",
        image: assest.blog02,
        isFav: false,
      },
      {
        id: Math.random(),
        name: "Pubg mobile launches version 2.0 update with evangelion's iconic angel",
        date: "Oct 11, 2022",
        image: assest.blog01,
        isFav: false,
      },
    ];
  }, []);

  const ebookCards = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Hidden Federation",
        image: assest.ebook01,
        isFav: true,
        discount: 80,
        author: "By: Tony Harmsworth",
      },
      {
        id: Math.random(),
        name: "The Lies I Tell",
        image: assest.ebook02,
        isFav: false,
        discount: 80,
        author: "By: Tony Harmsworth",
      },
      {
        id: Math.random(),
        name: "Hidden Federation",
        image: assest.ebook01,
        isFav: true,
        discount: 80,
        author: "By: Tony Harmsworth",
      },
    ];
  }, []);

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
      backgroundColor:  "black"
    }
  }));

  const AuthenticatePop = () => {
    // const [open, setOpen] = React.useState(false);

    // const useStyles = makeStyles((theme) => ({
    //   backDrop: {
    //     backdropFilter: "blur(3px)",
    //     backgroundColor:'rgba(0,0,30,0.4)'
    //   },
    // }));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button>
        <Dialog
          open={open}
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
                objectFit:"contain"
              }}
            />
            <h5 style={{marginBottom:"5%"}}>{"Creating your account"}</h5>
            <div style={{ textAlign: "end",marginBottom:"2%" }}>
              <span>20%</span>
            </div>
            <BorderLinearProgress variant="determinate" value={20} />
            <div style={{ marginTop: "10%",paddingBottom:"0px" }}>
              <ul class="verifying-list" style={{ textAlign: "start" }}>
                <li class="verifying-list__item" >
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
                </li>
              </ul>
            </div>
            <div>
              <p style={{fontWeight: 700}}>We cannot verify your account at this time. Please check your email for an activation link from:</p>
              <h3 style={{marginTop:"10px"}}>support@dailyrewards.me</h3>
          
            </div>
            <div className="primaryBtn home_primarybtn" style={{marginTop:"15px"}} >
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
      <div className="pagebody">
        <div className="couponSlider">
          <div className="secHeading">
            <h3>Today’s Coupon</h3>
            <Link href="/coupons">View more</Link>
          </div>
          <div className="itemsCarousel">
            <Slider {...settings}>
              {couponsData.map((item) => (
                <ProductCard item={item} key={item?.id} />
              ))}
            </Slider>
          </div>
        </div>
        <Fade
          in={
            comingNextMonthGameListDataLoading ||
            comingNextMonthGameListData?.game_list?.length > 0
          }
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Coming Next Month</h3>
              <Link href="/allComingNextMonth">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!comingNextMonthGameListDataLoading ? (
                <Slider {...settings}>
                  {comingNextMonthGameListData?.game_list?.length > 0 &&
                    comingNextMonthGameListData?.game_list?.map((item) => (
                      <GamesCard
                        item={item}
                        key={item?.id}
                        favouriteList={favourite_list}
                        type={"allcomingnextpath"}
                      />
                    ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <Fade
          in={
            recentlyPlayedGameListDataLoading ||
            recentlyPlayedGameListData?.game_list?.length > 0
          }
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Recently played</h3>
              <Link href="/recentlyPlayed">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!recentlyPlayedGameListDataLoading ? (
                <Slider {...settings}>
                  {recentlyPlayedGameListData?.game_list?.length > 0 &&
                    recentlyPlayedGameListData?.game_list?.map((item) => (
                      <GamesCard
                        item={item}
                        key={item?.id}
                        favouriteList={favourite_list}
                        type={"allcomingnextpath"}
                      />
                    ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        {/* <div className="couponSlider giftvoucher">
          <div className="secHeading">
            <h3>Gift Voucher</h3>
          </div>
          <div className="giftBanner">
            <figure>
              <Image
                loading="lazy"
                src={assest.giftbg}
                alt="gift"
                height={168}
                width={318}
                layout="responsive"
              />
            </figure>
            <div className="discountOffer">
              <span>Visa Gift Voucher</span>
              <p>25% OFF</p>
              <MyButton>Claim Gift</MyButton>
            </div>
          </div>
        </div> */}

        <Fade
          in={featuredGameListData?.game_list?.length > 0}
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Featured Games</h3>
              <Link href="/featuredgamesdetails">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!featuredGameListDataLoading ? (
                <Slider {...settings}>
                  {featuredGameListData?.game_list?.length > 0 &&
                    featuredGameListData?.game_list?.map((item) => (
                      <GamesCard
                        item={item}
                        key={item?.id}
                        favouriteList={favourite_list}
                        type={"allcomingnextpath"}
                      />
                    ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <Fade
          in={newReleaseGameListData?.game_list?.length > 0}
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>New Release</h3>
              <Link href="/newreleasedetails">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!newReleaseGameListDataLoading ? (
                <Slider {...settings}>
                  {newReleaseGameListData?.game_list?.length > 0 &&
                    newReleaseGameListData?.game_list?.map((item) => (
                      // <h1>{item?.game_name}</h1>
                      <GamesCard
                        item={item}
                        key={item?.id}
                        favouriteList={favourite_list}
                        type={"allcomingnextpath"}
                      />
                    ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <Fade
          in={popularNowGameListData?.game_list?.length > 0}
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Popular Now</h3>
              <Link href="/popularnowdetails">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!popularNowGameListDataLoading ? (
                <Slider {...settings}>
                  {popularNowGameListData?.game_list?.length > 0 &&
                    popularNowGameListData?.game_list?.map((item) => (
                      // <h1>{item?.game_name}</h1>
                      <GamesCard
                        item={item}
                        key={item?.id}
                        favouriteList={favourite_list}
                        type={"allcomingnextpath"}
                      />
                    ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <div className="couponSlider">
          <div className="secHeading">
            <h3>Watch Trailers</h3>
            <Link href="">View more</Link>
          </div>
          <div className="itemsCarousel">
            <Slider {...trailers}>
              {Array.from(Array(4).keys()).map((_, index) => (
                <WatchTrailers key={index} />
              ))}
            </Slider>
          </div>
        </div>

        <Fade
          in={
            CommingsoonmoviesDataListLoading ||
            (CommingsoonmoviesDataList && CommingsoonmoviesDataList?.length > 0)
          }
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Upcoming Movies</h3>
              <Link href="/movie">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!CommingsoonmoviesDataListLoading ? (
                <Slider {...upcomingmovies}>
                  {CommingsoonmoviesDataList?.map((item) => (
                    <UpcommingMoviesCard item={item} key={item?._id} />
                  ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_upcomingMovies />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <Fade
          in={BlogsDataLoading || (BlogsData && BlogsData?.length > 0)}
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Blogs</h3>
              <Link href="/allBlogs">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!BlogsDataLoading ? (
                <Slider {...blogs}>
                  {BlogsData?.map((item) => (
                    <BlogCard item={item} key={item?.id} />
                  ))}
                </Slider>
              ) : (
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_home_blogs />
                </Grid>
              )}
            </div>
          </div>
        </Fade>

        {/* <Fade
          in={ebookCards && ebookCards?.length > 0}
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Ebooks</h3>
              <Link href="/allEbooks">View more</Link>
            </div>
            <div className="itemsCarousel">
              <Slider {...ebooks}>
                {ebookCards.map((item) => (
                  <EbooksCard item={item} key={item?.id} />
                ))}
              </Slider>
            </div>
          </div>
        </Fade> */}
        {/* <div className="couponSlider">
          <div className="secHeading">
            <h3>Audio Files</h3>
            <Link href="/allAudioFiles">View more</Link>
          </div>
          <div className="fileListWrapper">
            <div className="fileItems">
              <div className="audioplayBtn">
                <MyButton>
                  <Image
                    loading="lazy"
                    src={assest.pauseIcon}
                    alt="Pause"
                    height={40}
                    width={40}
                  />
                </MyButton>
              </div>
              <div className="audioPlayBox">
                <div className="filesLeft">
                  <figure>
                    <Image
                      loading="lazy"
                      src={assest.audio01}
                      alt="Pause"
                      height={52}
                      width={54}
                    />
                  </figure>
                  <div className="filesName">
                    <h4>Audio Files</h4>
                    <p>Artist Name</p>
                  </div>
                </div>
                <div className="filesRight">2:52</div>
              </div>
            </div>
            <div className="fileItems">
              <div className="audioplayBtn">
                <MyButton>
                  <Image
                    loading="lazy"
                    src={assest.pauseIcon}
                    alt="Pause"
                    height={40}
                    width={40}
                  />
                </MyButton>
              </div>
              <div className="audioPlayBox">
                <div className="filesLeft">
                  <figure>
                    <Image
                      loading="lazy"
                      src={assest.audio02}
                      alt="Pause"
                      height={52}
                      width={54}
                    />
                  </figure>
                  <div className="filesName">
                    <h4>Audio Files</h4>
                    <p>Artist Name</p>
                  </div>
                </div>
                <div className="filesRight">2:52</div>
              </div>
            </div>
            <div className="fileItems">
              <div className="audioplayBtn">
                <MyButton>
                  <Image
                    loading="lazy"
                    src={assest.pauseIcon}
                    alt="Pause"
                    height={40}
                    width={40}
                  />
                </MyButton>
              </div>
              <div className="audioPlayBox">
                <div className="filesLeft">
                  <figure>
                    <Image
                      loading="lazy"
                      src={assest.audio03}
                      alt="Pause"
                      height={52}
                      width={54}
                    />
                  </figure>
                  <div className="filesName">
                    <h4>Audio Files</h4>
                    <p>Artist Name</p>
                  </div>
                </div>
                <div className="filesRight">2:52</div>
              </div>
            </div>
          </div>
        </div> */}

        <Fade
          in={todaysDeals && todaysDeals?.length > 0}
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Today's Deal</h3>
              <Link href="/allTodaysDeal">View more</Link>
            </div>
            <div className="itemsCarousel">
              <Slider {...settings}>
                {todaysDeals.map((item) => (
                  <ProductCard item={item} key={item?.id} />
                ))}
              </Slider>
            </div>
          </div>
        </Fade>

        <Fade
          in={
            DealsonWalmartDataLoading ||
            (DealsonWalmartData && DealsonWalmartData?.length > 0)
          }
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Deals On Walmart</h3>
              <Link href="/walmartdeals ">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!DealsonWalmartDataLoading ? (
                <Slider {...settings}>
                  {DealsonWalmartData?.map((item) => (
                    <WalmartCard item={item} key={item?.id} />
                  ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <Fade
          in={
            DealsonAmazonDataLoading ||
            (DealsonAmazonData && DealsonAmazonData?.length > 0)
          }
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Deals On Amazon</h3>
              <Link href="/amazondeals">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!DealsonAmazonDataLoading ? (
                <Slider {...settings}>
                  {DealsonAmazonData?.map((item) => (
                    <AmazondealsCard item={item} key={item?.id} />
                  ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <Fade
          in={
            DealsontargetDataLoading ||
            (DealsontargetData && DealsontargetData?.length > 0)
          }
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Deals On Target</h3>
              <Link href="/targetdeals">View more</Link>
            </div>
            <div className="itemsCarousel">
              {!DealsontargetDataLoading ? (
                <Slider {...settings}>
                  {DealsontargetData?.map((item) => (
                    <TargetdealCard item={item} key={item?.id} />
                  ))}
                </Slider>
              ) : (
                <div style={{ padding: "0px 20px 0px 20px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Fade>

        <Fade
          in={couponsData && couponsData?.length > 0}
          unmountOnExit
          mountOnEnter
        >
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Store List</h3>
              <Link href="/allstorelist">View more</Link>
            </div>
            <div className="itemsCarousel">
              <Slider {...settings}>
                {couponsData.map((item) => (
                  <ProductCard item={item} key={item?.id} />
                ))}
              </Slider>
            </div>
          </div>
        </Fade>
      </div>
    </Wrapper>
  );
}

//*   Proptype check
