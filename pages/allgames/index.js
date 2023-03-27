import React, { useEffect } from "react";
import styles from "@/styles/pages/productdetails.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { useMemo } from "react";
import GameCard from "@/components/ProductCard/GameCard";
import Image from "next/image";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { GetGameData } from "@/api/functions/GetProductDataList";
import { Cookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/layout/Footers/Footer";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import {
  Skeleton_favourite,
  Skeleton_search,
} from "@/components/Skeleton/Skeleton";
import { Grid } from "@mui/material";

// export async function getServerSideProps({ req }) {
//   let res = await GetGameData({
//     source: "external",
//     token: req.cookies.token,
//   });

//   return {
//     props: {
//       allgamesData: res,
//     },
//   };
// }

const cookie = new Cookies();
function index({}) {
  const token = cookie.get("token");
  const { favourite_list } = useSelector((state) => state?.profile);
  const router = useRouter();
  const { availableThemes, currentTheme } = useGamodoTheme();
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
    data: allGamesData,
    remove,
    isLoading: allGamesDataLoading,
  } = useQuery(
    "allGamesData",
    async () => {
      return GetGameData({
        source: "external",
        token: token,
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    },
    { onerror: (error) => alert(error) }
  );

  useEffect(() => {
    return () => {
      remove();
    };
  }, []);

  return (
    <div className={styles.page_product_details}>
      <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      ></div>
      {/* <BackButton onClick={() => router.push("/home")} /> */}
      {/* <div className="commonTopTitle">
        <h3>Games</h3>
      </div> */}
      <SingleHeader type={"games"} />

      <div
        className="couponSlider"
        style={{ position: "relative", marginTop: "30px" }}
      >
        {!allGamesDataLoading ? (
          allGamesData?.map((item, index) => {
            return (
              <>
                <div className="secHeading">
                  <h3>{item?.groupName}</h3>
                  <Link
                    href={`/game-by-category/${item?.groupId}`}
                    style={{ cursor: "pointer" }}
                    // onClick={() => router.push("/game-by-category")}
                  >
                    View more
                  </Link>
                </div>
                <div className="itemsCarousel">
                  <Slider {...settings}>
                    {item?.groupData?.map((item) => (
                      <GameCard
                        item={item}
                        key={item?.id}
                        favouriteList={favourite_list}
                      />
                    ))}
                  </Slider>
                </div>
              </>
            );
          })
        ) : (
          <>
            <div style={{ padding: "0px 20px 0px 20px" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Skeleton_search />
              </Grid>
            </div>
            <div style={{ padding: "0px 20px 0px 20px", marginTop: "20px" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Skeleton_search />
              </Grid>
            </div>
            <div style={{ padding: "0px 20px 0px 20px", marginTop: "20px" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Skeleton_search />
              </Grid>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default index;
