import React, { useMemo } from "react";
import assest from "@/json/assest";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SingleHeader from "@/layout/Headers/SingleHeader";
import TargetdealCard from "@/components/ProductCard/TargetdealCard";
import styles from "@/styles/pages/movie.module.scss";
import WalmartCard from "@/components/ProductCard/WalmartCard";
import { GetdealsonWalmartFullDataList } from "@/api/functions/GetProductDataList";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
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
//   let res = await GetdealsonWalmartFullDataList();

//   return {
//     props: {
//       walmartdealsfulldata: res,
//     }, // will be passed to the page component as props
//   };
// }
const cookie = new Cookies();
function index() {
  const token = cookie.get("token");
  const { data: walmartDealsData, isLoading: walmartDealsLoading } = useQuery(
    "walmartDeals",
    async () => {
      return GetdealsonWalmartFullDataList();
    },
    {
      enabled: Boolean(token),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className={styles.moviepageWrapper}>
      <SingleHeader type={"walmartdeals"} />
      <div className="moviePagebody">
        <div className="couponSlider">
          <div className="itemsCarousel">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {!walmartDealsLoading ? (
                  walmartDealsData?.map((item) => (
                    <Grid item sm={4} xs={6}>
                      <WalmartCard item={item} key={item?.id} />
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
