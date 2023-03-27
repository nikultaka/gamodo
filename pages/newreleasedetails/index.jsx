//* *  PROJECT IMPORTS   */
import React, { useEffect, useState } from "react";
import GetProductDataList, {
  GetAllCatGames,
  GetDashboardData,
} from "@/api/functions/GetProductDataList";
import "slick-carousel/slick/slick.css";
import CatGameCard from "@/components/ProductCard/CatGameCard";
import styles from "@/styles/pages/movie.module.scss";
import "slick-carousel/slick/slick-theme.css";
import GamesCard from "@/components/ProductCard/GamesCard";
import { Grid, Pagination } from "@mui/material";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { Skeleton_favourite } from "@/components/Skeleton/Skeleton";
import { getHostName } from "@/lib/functions/_common.lib";
import { getMyFavourite } from "@/reduxtoolkit/profile.slice";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

//  Commingsoon Movies Serverside Data
// export async function getServerSideProps({ req }) {
//   let res = await GetAllCatGames({
//     source: "external",
//     token: req.cookies.token,
//     type: "new-releases",
//   });
//   return {
//     props: {
//       newreleaseData: res,
//     }, // will be passed to the page component as props
//   };
// }

const cookie = new Cookies();
export default function index({}) {
  const dispatch = useDispatch();
  const token = cookie.get("token");
  const [page, setPage] = useState(1);
  const { favourite_list } = useSelector((state) => state?.profile);

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

  const {
    data: newReleaseData,
    refetch,
    remove,
    isLoading: newReleaseDataLoading,
  } = useQuery(
    "newReleaseData",
    async () => {
      return GetAllCatGames({
        token: token,
        source: "external",
        type: "new-releases",
        page: page.toString(),
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    refetch();
    remove()
    const data = {
      source: "external",
      image_size: "THUMBNAIL",
      start_page: "all",
    };
    dispatch(getMyFavourite(data));
  }, [page]);

  return (
    <div className={styles.page_product_details}>
      {/* <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      ></div>
      <BackButton onClick={() => router.push("/home")} />
      <div className="commonTopTitle">
        {CommingsoonData1?.result?.data?.coming_next_month?.length > 0 ? (
          <h3>Coming next month</h3>
        ) : (
          <h3>Games</h3>
        )}
      </div> */}
      <SingleHeader type={"newrelease"} />

      <div className="couponSlider moreGame">
        <Grid container spacing={2}>
          {!newReleaseDataLoading ? (
            newReleaseData?.game_list?.map((item, index) => {
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
                      favouriteList={favourite_list}
                      key={item?.id}
                      // type={"newreleasegames"}
                    />
                    {/* ))} */}
                    {/* </Slider> */}
                  </div>
                </Grid>
              );
            })
          ) : (
            <Skeleton_favourite />
          )}
        </Grid>
      </div>
      {newReleaseData?.game_list?.length > 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
          onChange={handleChange}
          page={page}
          count={newReleaseData?.pages}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
}

//*   Proptype check
