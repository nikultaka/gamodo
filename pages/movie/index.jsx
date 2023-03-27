import React, { useMemo } from "react";
import assest from "@/json/assest";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SingleHeader from "@/layout/Headers/SingleHeader";
import UpcommingMoviesCard from "@/components/ProductCard/UpcommingMoviesCard";
import styles from "@/styles/pages/movie.module.scss";
import {
  GetComingFullList,
  GetCommingsoonmoviesDataList,
} from "@/api/functions/GetProductDataList";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { Skeleton_upcomingMovies } from "@/components/Skeleton/Skeleton";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}
// export async function getServerSideProps() {
//   let res = await GetComingFullList();

//   return {
//     props: {
//       CommingsoonData1: res,
//     }, // will be passed to the page component as props
//   };
// }
const cookie = new Cookies();
function index() {
  const token = cookie.get("token");

  const { data: moviesData, isLoading: moviesDataLoading } = useQuery(
    "moviesData",
    async () => {
      return GetComingFullList();
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

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

  return (
    <div className={styles.moviepageWrapper}>
      <SingleHeader type={"movies"} />
      <div className="moviePagebody">
        <div className="couponSlider">
          <div className="itemsCarousel">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {!moviesDataLoading ? (
                  moviesData?.map((item) => (
                    <Grid item sm={4} xs={6} key={item?._id}>
                      <UpcommingMoviesCard item={item} key={item?._id} />
                    </Grid>
                  ))
                ) : (
                  <Skeleton_upcomingMovies />
                )}
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
