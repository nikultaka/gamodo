import React, { useMemo } from "react";
import assest from "@/json/assest";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SingleHeader from "@/layout/Headers/SingleHeader";
import AllstoreListCard from "@/components/ProductCard/AllstoreListCard";
import styles from "@/styles/pages/movie.module.scss";
import { GetdealsonTargetFullDataList } from "@/api/functions/GetProductDataList";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}
// export async function getServerSideProps() {
//   let res = await GetdealsonTargetFullDataList();

//   return {
//     props: {
//       tagegetdealsfulldata: res,
//     }, // will be passed to the page component as props
//   };
// }
const cookie = new Cookies();
function index(tagegetdealsfulldata) {
  const token = cookie.get("token");
  const couponsData = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product01,
        isFav: true,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product02,
        discount: 50,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product03,
        discount: 25,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product01,
        discount: 20,
        category: "Target",
        expiryDate: "10/31",
      },
    ];
  }, []);

  const { data: dealsOnTargetData, isLoading: dealsOnTargetDataLoading } =
    useQuery(
      "dealsOnTargetData",
      async () => {
        return GetdealsonTargetFullDataList();
      },
      {
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
      }
    );

  return (
    <div className={styles.moviepageWrapper}>
      <SingleHeader type={"storelist"} />
      <div className="moviePagebody">
        <div className="couponSlider">
          <div className="itemsCarousel">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {couponsData?.map((item) => (
                  <Grid item sm={4} xs={6}>
                    <AllstoreListCard
                      item={item}
                      key={item?.id}
                      type={"storelist"}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
