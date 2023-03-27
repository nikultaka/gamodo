import React, { useEffect, useMemo, useState } from "react";
import assest from "@/json/assest";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SingleHeader from "@/layout/Headers/SingleHeader";
import CatGameCard from "@/components/ProductCard/CatGameCard";
import styles from "@/styles/pages/movie.module.scss";
import {
  GetDashboardData,
  GetCommingsoonmoviesDataList,
  GetAllCatGames,
} from "@/api/functions/GetProductDataList";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { Skeleton_favourite } from "@/components/Skeleton/Skeleton";
import { getHostName } from "@/lib/functions/_common.lib";
import { Pagination } from "@mui/material";
import { getMyFavourite } from "@/reduxtoolkit/profile.slice";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}
// export async function getServerSideProps({ req }) {
//   let res = await GetAllCatGames({
//     source: "external",
//     token: req.cookies.token,
//     type: "recently-played",
//   });

//   return {
//     props: {
//       recentlyPlayedData: res,
//     }, // will be passed to the page component as props
//   };
// }
const cookie = new Cookies();
function index({}) {
  const router = useRouter();
  const token = cookie.get("token");
  const { availableThemes, currentTheme } = useGamodoTheme();
  const { favourite_list } = useSelector((state) => state?.profile);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setPage(value);
  };

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

  const {
    data: recentlyPlayedData,
    refetch,
    remove,
    isLoading: recentlyPlayedDataLoading,
  } = useQuery(
    "recentlyPlayedData",
    async () => {
      return GetAllCatGames({
        token: token,
        source: "external",
        type: "recently-played",
        page: page.toString(),
      });
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
    remove();
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
      <SingleHeader type={"recentlyplayed"} />

      <div className="couponSlider moreGame">
        <Grid container spacing={2}>
          {!recentlyPlayedDataLoading ? (
            recentlyPlayedData?.game_list?.map((item, index) => {
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
                      // type={"recentlyplayed"}
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
      {recentlyPlayedData?.game_list?.length > 0 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
          onChange={handleChange}
          page={page}
          count={recentlyPlayedData?.pages}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default index;
