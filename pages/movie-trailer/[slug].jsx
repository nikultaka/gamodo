import React, { useEffect } from "react";
import styles from "@/styles/pages/productdetails.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import Image from "next/image";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import CommingsoonCard from "@/components/ProductCard/CommingsoonCard";
import { useMemo } from "react";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import {
  GetCommingsoonmoviesDataDeatils,
  GetComingFullList,
} from "@/api/functions/GetProductDataList";
import Link from "next/link";
import WatchTrailers from "@/components/WatchTrailers/WatchTrailers";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { Movie_trailer_skeleton } from "@/components/Skeleton/Skeleton";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

// export async function getServerSideProps({ query }) {
//   let res = await GetCommingsoonmoviesDataDeatils(query?.slug);
//   const res1 = await GetComingFullList();

//   return {
//     props: {
//       CommingsoonDataDeatils: res,
//       CommingsoonData1: res1,
//     }, // will be passed to the page component as props
//   };
// }

const cookie = new Cookies();
function index({}) {
  const token = cookie.get("token");
  const router = useRouter();
  console.log("router", router?.query?.slug);

  const {
    data: CommingsoonDataDeatils,
    refetch,
    remove,
    isLoading: CommingsoonDataDeatilsLoading,
  } = useQuery(
    ["CommingsoonDataDeatils", router?.query?.slug],
    async () => {
      return GetCommingsoonmoviesDataDeatils(router?.query?.slug);
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  const { data: CommingsoonData1, isLoading: CommingsoonData1Loading } =
    useQuery(
      "CommingsoonData1",
      async () => {
        return GetComingFullList();
      },
      {
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
      }
    );

  // useEffect(() => {
  //   if (router?.query?.slug) {
  //     // refetch();
  //     remove();
  //   }
  // }, [router?.query?.slug]);

  const { availableThemes, currentTheme } = useGamodoTheme();
  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.42,
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
          slidesToShow: 2.42,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const CommingsoonData = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.movie01,
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.movie02,
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.movie03,
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.movie01,
      },
    ];
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.page_product_details}>
      <Box sx={{ position: "fixed", left: "0", top: "0", zIndex: "1" }}>
        <BackButton onClick={() => router.back()} />
      </Box>

      <div className={styles.moviesBanner}>
        <div className={styles.bannerfigure}>
          {!CommingsoonDataDeatilsLoading ? (
            <Image
              loading="lazy"
              // src={assest.trailer02}
              src={CommingsoonDataDeatils?.imageUrl}
              alt="Item"
              height={501}
              width={375}
              layout="responsive"
            />
          ) : (
            <Movie_trailer_skeleton />
          )}

          {/* <Link href="/WatchTrailers"> */}
          <div className={styles.trailerBtn} onClick={handleClickOpen}>
            <MyButton>Watch Trailer</MyButton>
          </div>
          {/* </Link> */}
        </div>
      </div>
      <div
        className={`${styles.product_description} ${styles.trailer_description}`}
      >
        <div className={styles.productName}>
          <div className={styles.nameLeft}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                "& svg": {
                  m: 1.5,
                },
                "& hr": {
                  mx: 0.5,
                },
              }}
            >
              {CommingsoonDataDeatils?.genres?.map((item, index) => (
                <>
                  <p>{item}</p>
                  {index < CommingsoonDataDeatils?.genres?.length - 1 && (
                    <>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: "black", height: "15px" }}
                      />
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: "black", height: "15px" }}
                      />
                    </>
                  )}
                </>
              ))}
            </Box>

            <h4>{CommingsoonDataDeatils?.title}</h4>
          </div>
          {/* <div className={styles.wishlistright}>
            <WishlistHeart size={20} enablePopEffect />
          </div> */}
        </div>
        {CommingsoonDataDeatils?.releaseDate && (
          <span>
            Release:{" "}
            {moment(CommingsoonDataDeatils?.releaseDate).format("DD MMM,YYYY")}
          </span>
        )}

        {/* <span>Rating: PG-13</span> */}
        {CommingsoonDataDeatils?.videoDescription && (
          <>
            <h5>Description</h5>
            <p>{CommingsoonDataDeatils?.videoDescription}</p>{" "}
          </>
        )}
      </div>
      <div className={styles.commimgSoonMoviecard}>
        <div className="couponSlider">
          <div className="secHeading">
            <h3>Coming Soon</h3>
          </div>
          <div className="itemsCarousel">
            <Slider {...settings}>
              {CommingsoonData1?.map((item) => (
                <CommingsoonCard
                  item={item}
                  key={item?.id}
                  type={"comingsoonmovies"}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
        className={styles.opentrailerDialog}
      >
        <div class="tailer-container">
          <Box sx={{ position: "fixed", left: "0", top: "0", zIndex: "1" }}>
            <BackButton onClick={() => setOpen(false)} />
          </Box>
          <div className="videoGame">
            <video
              controls
              controlsList="nodownload"
              width="100%"
              height="100%"
              autoPlay
              muted={true}
              loop={true}
              src={CommingsoonDataDeatils?.videoUrl}
            />
          </div>
          <div className={styles.product_description}>
            <div className={styles.productName}>
              <h4>{CommingsoonDataDeatils?.title}</h4>
            </div>
            <div
              style={{ padding: "0px" }}
              className={`${styles.product_description} ${styles.trailer_description}`}
            >
              <div className={styles.productName}>
                <div className={styles.nameLeft}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      "& svg": {
                        m: 1.5,
                      },
                      "& hr": {
                        mx: 0.5,
                      },
                    }}
                  >
                    {CommingsoonDataDeatils?.genres?.map((item, index) => (
                      <>
                        <p style={{ marginBottom: "0px" }}>{item}</p>
                        {index < CommingsoonDataDeatils?.genres?.length - 1 && (
                          <>
                            <div>,</div>
                          </>
                        )}
                      </>
                    ))}
                  </Box>
                </div>
              </div>
            </div>
            {/* {CommingsoonDataDeatils?.genres?.length > 0 && (
              <span>{`${CommingsoonDataDeatils?.genres[0]},${CommingsoonDataDeatils?.genres[1]},${CommingsoonDataDeatils?.genres[2]},${CommingsoonDataDeatils?.genres[3]}`}</span>
            )} */}

            <span>Rating: PG-13</span>
            <span>
              <strong>
                Release:{" "}
                {moment(CommingsoonDataDeatils?.releaseDate).format(
                  "MM/DD/YYYY"
                )}
              </strong>
            </span>
            <h5>Description</h5>
            <p>{CommingsoonDataDeatils?.videoDescription}</p>
          </div>
        </div>
      </Dialog>
    </div>

    // OLD DESIGN

    // <div className={styles.page_product_details}>
    //   <div
    //     className={`${
    //       currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
    //     }`}
    //   ></div>
    //   <BackButton />
    //   <div className="commonTopTitle">
    //     <h3>Movie Releases</h3>
    //   </div>
    //   <div className={styles.trailerVdo}>
    //     <div className="videoGame">
    //       <ReactPlayer
    //         width="100%"
    //         height="100%"
    //         playing="true"
    //         muted="true"
    //         loop="true"
    //         url="/assets/images/pukk.mp4"
    //       />
    //     </div>
    //     <div className={styles.couponBtn}>
    //       <MyButton>Watch Trailer</MyButton>
    //     </div>
    //   </div>
    //   <div className={styles.product_description}>
    //     <div className={styles.productName}>
    //       <div className={styles.nameLeft}>
    //         <p>Action</p>
    //         <h4>Avatar: The Way of Water</h4>
    //       </div>
    //       <div className={styles.wishlistright}>
    //         <svg
    //           width="22"
    //           height="20"
    //           viewBox="0 0 22 20"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M19.888 1.64942C17.7843 -0.542863 14.3683 -0.542863 12.2645 1.64942L10.8325 3.1335L9.40051 1.64421C7.29154 -0.54807 3.88075 -0.54807 1.777 1.64421C-0.592332 4.10727 -0.592332 8.10649 1.777 10.5695L10.8325 20L19.888 10.5748C22.2574 8.1117 22.2574 4.11248 19.888 1.64942Z"
    //             fill="#FF0000"
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //     <span>Release: December 16, 2022</span>
    //     <span>Rating: PG-13</span>
    //     <h5>Description</h5>
    //     <p>
    //       Lorem Ipsum is simply dummy text of the printing and typesetting
    //       industry. Lorem Ipsum has been the industry's standard dummy text ever
    //       since the 1500s, when an unknown printer took a galley of type and
    //       scrambled it to make a type specimen book
    //     </p>
    //   </div>
    //   <div className="couponSlider">
    //     <div className="secHeading">
    //       <h3>Coming Soon</h3>
    //     </div>
    //     <div className="itemsCarousel">
    //       <Slider {...settings}>
    //         {Array.from(Array(4).keys()).map((_, index) => (
    //           <div className="itemsWrapper" key={index}>
    //             <div className="productCard">
    //               <div className="itemsFav">
    //                 <div className="iconHeart">
    //                   <svg
    //                     width="22"
    //                     height="20"
    //                     viewBox="0 0 22 20"
    //                     fill="none"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                   >
    //                     <path
    //                       d="M19.888 1.64942C17.7843 -0.542863 14.3683 -0.542863 12.2645 1.64942L10.8325 3.1335L9.40051 1.64421C7.29154 -0.54807 3.88075 -0.54807 1.777 1.64421C-0.592332 4.10727 -0.592332 8.10649 1.777 10.5695L10.8325 20L19.888 10.5748C22.2574 8.1117 22.2574 4.11248 19.888 1.64942Z"
    //                       fill="#D7D7D7"
    //                     />
    //                   </svg>
    //                 </div>
    //               </div>
    //               <figure>
    //                 <Image
    // loading="lazy"
    //
    //                   src={assest.trailer01}
    //                   alt="Item"
    //                   height={199}
    //                   width={150}
    //                   layout="responsive"
    //                 />
    //               </figure>
    //               <div className="cardDetails">
    //                 <h4>Spoiler Alert</h4>
    //                 <p>12/9/22</p>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </Slider>
    //     </div>
    //   </div>
    // </div>
  );
}

export default index;
