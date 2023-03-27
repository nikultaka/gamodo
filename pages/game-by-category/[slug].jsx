import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/productdetails.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { useMemo } from "react";
import CatGameCard from "@/components/ProductCard/CatGameCard";
import Image from "next/image";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { GetCatGameData } from "@/api/functions/GetProductDataList";
import { Cookies } from "react-cookie";
import Link from "next/link";
import { Grid, Pagination } from "@mui/material";
import Footer from "@/layout/Footers/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMyFavourite } from "@/reduxtoolkit/profile.slice";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getHostName } from "@/lib/functions/_common.lib";
import { Skeleton_search } from "@/components/Skeleton/Skeleton";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

// export async function getServerSideProps({ req, query, params, report_id }) {
//   let res = await GetCatGameData({
//     source: "external",
//     type: "what's-popular-now",
//     category_id: query?.slug,
//     token: req.cookies.token,
//   });

//   return {
//     props: {
//       allCatgamesData: res,
//     },
//   };
// }

const cookie = new Cookies();
function index({}) {
  const router = useRouter();
  const token = cookie.get("token");
  const dispatch = useDispatch();
  const { favourite_list } = useSelector((state) => state?.profile);
  const [page, setPage] = useState("1");

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
    data: catGameData,
    refetch,
    remove,
    isLoading: catGameDataLoading,
  } = useQuery(
    "catGameData",
    async () => {
      return GetCatGameData({
        source: "external",
        // type: "what's-popular-now",
        category_id: router?.query?.slug,
        token: token,
        page: page.toString(),
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  console.log("catGameData",catGameData);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    refetch(), remove();
  }, [page]);

  useEffect(() => {
    const data = {
      source: "external",
      image_size: "THUMBNAIL",
      start_page: "all",
    };
    dispatch(getMyFavourite(data));
  }, [page]);

  return (
    <div className={styles.page_product_details}>
      <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      ></div>
      <BackButton />
      <div className="commonTopTitle">
        <h3>Games</h3>
      </div>
      <div className="scrollSec">
        <div className="couponSlider moreGame">
          <Grid container spacing={2}>
            {!catGameDataLoading ? (
              catGameData?.game_list?.map((item, index) => {
                return (
                  <Grid item sm={6} xs={6}>
                    <div className="secHeading">
                      <h3>{item?.groupName}</h3>
                      {/* <Link href="/">View more</Link> */}
                    </div>
                    <div className="itemsCarousel">
                      {/* <Slider {...settings}> */}
                      {/* {item?.map((item) => ( */}

                      <CatGameCard
                        item={item}
                        key={item?.id}
                        favouriteList={favourite_list}
                      />
                      {/* ))} */}
                      {/* </Slider> */}
                    </div>
                  </Grid>
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
                <div
                  style={{ padding: "0px 20px 0px 20px", marginTop: "20px" }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Skeleton_search />
                  </Grid>
                </div>
                <div
                  style={{ padding: "0px 20px 0px 20px", marginTop: "20px" }}
                >
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
          </Grid>
        </div>
      </div>
      {catGameData?.game_list?.length > 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
          onChange={handleChange}
          page={parseInt(page)}
          count={parseInt(catGameData?.pages)}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default index;
