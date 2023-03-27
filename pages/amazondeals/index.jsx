import React, { useMemo } from "react";
import assest from "@/json/assest";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SingleHeader from "@/layout/Headers/SingleHeader";
import TargetdealCard from "@/components/ProductCard/TargetdealCard";
import styles from "@/styles/pages/movie.module.scss";
import AmazondealsCard from "@/components/ProductCard/AmazondealsCard";
import { GetdealsonAmazonFullDataList } from "@/api/functions/GetProductDataList";
import { Cookies } from "react-cookie";
import { useQuery } from "react-query";
import { Skeleton_favourite } from "@/components/Skeleton/Skeleton";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}
// export async function getServerSideProps() {
//   let res = await GetdealsonAmazonFullDataList();

//   return {
//     props: {
//       amazondealsfulldata: res,
//     }, // will be passed to the page component as props
//   };
// }
const cookie = new Cookies();
function index() {
  const token = cookie.get("token");

  const { data: amazonDealsData, isLoading: amazonDealsDataLoading } = useQuery(
    "amazonDealsData",
    async () => {
      return GetdealsonAmazonFullDataList();
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className={styles.moviepageWrapper}>
      <SingleHeader type={"amazondeals"} />
      <div className="moviePagebody">
        <div className="couponSlider">
          <div className="itemsCarousel">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {!amazonDealsDataLoading ? (
                  amazonDealsData?.length > 0 &&
                  amazonDealsData?.map((item) => (
                    <Grid item sm={4} xs={6}>
                      <AmazondealsCard item={item} key={item?.id} />
                    </Grid>
                  ))
                ) : (
                  <Skeleton_favourite />
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
