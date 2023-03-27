import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/pages/productdetails.module.scss";
import styles1 from "@/styles/components/button.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { useMemo } from "react";
import {
  gameDetails,
  GetCommingsoonmoviesDataList,
  saveToRecently,
} from "@/api/functions/GetProductDataList";
import GameDetailsCard from "@/components/ProductCard/GameDetailsCard";
import { useRouter } from "next/router";
import Footer from "@/layout/Footers/Footer";
import { Box } from "@mui/system";
import { QueryClient, useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  clear_recently_played_status,
  getMyFavourite,
  recently_played,
} from "@/reduxtoolkit/profile.slice";
import useNotiStack from "@/hooks/useNotistack";
import { checkFav } from "@/api/functions/checkFavourite";
import Button from "@mui/material/Button";
import {
  Skeleton_blogDetails_image,
  Skeleton_home_blogs,
  Skeleton_text,
} from "@/components/Skeleton/Skeleton";
import GameDisplay from "@/components/GameDisplay";
import { getHostName } from "@/lib/functions/_common.lib";
import { Fade, Slide, styled } from "@mui/material";
import moment from "moment/moment";
import useWindowScroll from "@/hooks/useWindowScroll";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

// export async function getServerSideProps({ req, query, params, report_id }) {
//   let res = await gameDetails({
//     source: "external",
//     slug: query?.slug,
//     token: req.cookies.token,
//   });

//   return {
//     props: {
//       gameDetailsData: res,
//     },
//   };
// }
const cookie = new Cookies();
const StyledBackButton = styled(BackButton)`
  button {
    position: absolute;
  }
`;
const StyledHeaderContainer = styled(Box, {
  shouldForwardProp: (propName) => propName !== "isPlayed",
})`
  ${({ isPlayed }) => {
    return isPlayed ? `padding-bottom:45px!important;` : "";
  }}
`;
function index({ isUserAgentMobile }) {
  const token = cookie.get("token");

  const { recently_played_msg, recently_played_status } = useSelector(
    (state) => state?.profile
  );

  const router = useRouter();
  const [isError, setIsError] = useState("");
  const { toastSuccess, toastError } = useNotiStack();
  const dispatch = useDispatch();
  const { availableThemes, currentTheme } = useGamodoTheme();
  const { favourite_list } = useSelector((state) => state?.profile);
  const [isPlayed, setIsPlayed] = useState(false);
  const [hideNavbar, sethideNavbar] = useState(false);

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

  const {
    data: gameDetailsData,
    refetch,
    isLoading,
    remove,
  } = useQuery(`gameDetailsData`, async () => {
    return gameDetails({
      source: "external",
      slug: router?.query?.slug,
      token: token,
    });
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
        enabled: Boolean(token),
      },
    },
  });

  function runOnScroll(element) {
    // not the most exciting thing, but a thing nonetheless
  }

  useEffect(() => {
    window.addEventListener("scroll", (event) => {});
  }, []);

  useEffect(() => {
    remove();
    refetch();
  }, [router?.query?.slug]);

  const gameCategoryName =
    gameDetailsData?.result?.data?.game_details?.category_name?.split(",");

  useEffect(() => {
    const data = {
      source: "external",
      image_size: "THUMBNAIL",
      start_page: "all",
    };
    dispatch(getMyFavourite(data));
  }, [router?.query?.slug]);

  const recentlyPlayedFunc = () => {
    if (router?.query?.slug) {
      const data = {
        source: "external",
        slug: router?.query?.slug,
      };
      dispatch(recently_played(data));
      // router.push(gameDetailsData?.result?.data?.game_details?.game_url);
    }
  };

  useEffect(() => {
    if (recently_played_status == 0) {
      dispatch(clear_recently_played_status(null));
    }
  }, [recently_played_status]);

  const isActive = useMemo(
    () =>
      checkFav(
        favourite_list?.length > 0 && favourite_list,
        gameDetailsData?.result?.data?.game_details?.game_name
      ),
    [favourite_list, gameDetailsData?.result?.data?.game_details?.game_name]
  );



  const curr_date = moment(new Date(), "MM/DD/YYYY");
  const required_date = moment(
    gameDetailsData?.result?.data?.game_details?.available_date,
    "MM/DD/YYYY"
  );
  const date_diff = required_date.diff(curr_date, "days");
  const headerRef = useRef(null);

  return (
    <div className={styles.page_product_details}>
      {/* {!hideNavbar && ( */}
      {/* <> */}

      <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      />
      {!isPlayed ? (
        <StyledHeaderContainer
          ref={headerRef}
          className={hideNavbar ? "d-none" : "d-block commonTopTitle"}
          isPlayed={isPlayed}
        >
          <h3>
            {!hideNavbar &&
              gameDetailsData?.result?.data?.game_details?.game_name}
          </h3>
          <StyledBackButton
            onClick={isPlayed ? () => setIsPlayed(false) : undefined}
          />
        </StyledHeaderContainer>
      ) : null}

      {/* </> */}
      {/* )} */}

      <Fade in={!isPlayed} unmountOnExit mountOnEnter>
        <div className="scrollSec">
          <div className={styles.productImage} style={{ marginTop: "0px" }}>
            {!isLoading ? (
              <>
                {isError ? (
                  <figure>
                    <Image
                      loading="lazy"
                      src={
                        gameDetailsData?.result?.data?.game_details
                          ?.game_thumbnail
                      }
                      alt="menu1"
                      height={170}
                      width={255}
                    />
                  </figure>
                ) : (
                  <div className="productCard">
                    <div className="videoGame">
                      <video
                        onError={(e) => setIsError(e?.type)}
                        style={{ paddingRight: "40px" }}
                        controls
                        controlsList="nodownload"
                        width="300px"
                        height="200px"
                        playing={true}
                        muted={true}
                        loop={true}
                        src={
                          gameDetailsData?.result?.data?.game_details
                            ?.game_video
                        }
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Skeleton_blogDetails_image />
            )}

            {/* <div className={styles.itemsDiscount}>
          <p>Save upto $100</p>
        </div> */}
            <div className={styles.couponBtn}>
              <button
                onClick={() => {
                  if (
                    isUserAgentMobile &&
                    gameDetailsData?.result?.data?.game_details?.game_url &&
                    gameDetailsData?.result?.data?.game_details
                      ?.available_date == undefined
                  ) {
                    recentlyPlayedFunc(), setIsPlayed(true);
                  }
                }}
              >
                {isLoading ? (
                  <p style={{ padding: "15px" }} className={styles.canplay}>
                    Loading...
                  </p>
                ) : isUserAgentMobile &&
                  gameDetailsData?.result?.data?.game_details?.game_url &&
                  gameDetailsData?.result?.data?.game_details?.available_date ==
                    undefined ? (
                  <p style={{ padding: "15px" }} className={styles.canplay}>
                    Play Now
                  </p>
                ) : gameDetailsData?.result?.data?.game_details
                    ?.available_date !== undefined ? (
                  <p style={{ padding: "15px" }} className={styles.cannotplay}>
                    Available:{" "}
                    {gameDetailsData?.result?.data?.game_details
                      ?.available_date != undefined &&
                      moment(
                        gameDetailsData?.result?.data?.game_details
                          ?.available_date
                      ).format("MM/DD/YYYY")}
                  </p>
                ) : (
                  <p style={{ padding: "15px" }} className={styles.canplay}>
                    Play Now
                  </p>
                )}
              </button>
            </div>
          </div>
          <div className={styles.product_description}>
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
                  {gameCategoryName?.length > 1 ? (
                    gameCategoryName?.map((item, index) => (
                      <>
                        <p>
                          <b style={{ fontWeight: "1000" }}>{item}</b>
                        </p>
                        {index < gameCategoryName?.length - 1 && (
                          <>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                bgcolor: "black",
                                height: "15px",
                                marginTop: "3px",
                              }}
                            />
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                bgcolor: "black",
                                height: "15px",
                                marginTop: "3px",
                              }}
                            />
                          </>
                        )}
                      </>
                    ))
                  ) : (
                    <p>
                      <b style={{ fontWeight: "1000" }}>
                        {
                          gameDetailsData?.result?.data?.game_details
                            ?.category_name
                        }
                      </b>
                    </p>
                  )}
                </Box>

                <h4>
                  {gameDetailsData?.result?.data?.game_details?.game_name}
                </h4>
              </div>
              <div className={styles.wishlistright}>
                <WishlistHeart
                  size={20}
                  enablePopEffect
                  active={isActive}
                  item={gameDetailsData?.result?.data?.game_details}
                />
              </div>
            </div>
            {/* <span>Expire on: 10/31/2022</span> */}
            <h5>Description</h5>
            {!isLoading ? (
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    gameDetailsData?.result?.data?.game_details
                      ?.game_description,
                }}
              ></p>
            ) : (
              <Skeleton_text />
            )}
          </div>
          <div className="couponSlider">
            <div className="secHeading">
              {gameDetailsData?.result?.data?.similar_games?.length > 0 && (
                <h3>Similar games</h3>
              )}
            </div>
            <div className="itemsCarousel">
              <Slider {...settings}>
                {gameDetailsData?.result?.data?.similar_games?.map((item) => (
                  <GameDetailsCard
                    item={item}
                    key={item?.id}
                    favouriteList={favourite_list}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade
        in={isPlayed && gameDetailsData?.result?.data?.game_details?.game_url}
        unmountOnExit
        mountOnEnter
      >
        <GameDisplay
          id="gamePlay"
          gameDetails={gameDetailsData?.result?.data?.game_details}
          // offsetHeight={
          //   headerRef.current?.getBoundingClientRect?.()?.height + "px" || 0
          // }
          onBack={isPlayed ? () => setIsPlayed(false) : undefined}
        />
      </Fade>
    </div>
  );
}

export default index;
