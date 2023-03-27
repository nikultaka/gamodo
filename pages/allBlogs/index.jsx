import BlogCard from "@/components/ProductCard/BlogCard";
import assest from "@/json/assest";
import Wrapper from "@/layout/Wrappers/Wrapper";
import Link from "next/link";
import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { GetBlogsFullDataList } from "@/api/functions/GetProductDataList";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { Grid } from "@mui/material";
import { Skeleton_blogs } from "@/components/Skeleton/Skeleton";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

const cookie = new Cookies();
export default function index() {
  const token = cookie.get("token");
  const { data: BlogsData, isLoading: BlogsDataLoading } = useQuery(
    "GetBlogsFullDataList",
    async () => {
      return GetBlogsFullDataList({
        token: token,
      });
    },
    {
      enabled: Boolean(token),
    }
  );
  var blogs = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.3,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Wrapper type={"blogs"}>
        <SingleHeader type={"blogs"} />
        <div className="pagebody">
          <div className="couponSlider">
            <div className="secHeading"></div>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {!BlogsDataLoading ? (
                BlogsData?.map((item) => {
                  return (
                    // <div className="container">
                    <Grid item xs={6}>
                      <div className="itemsCarousel moreGame">
                        <BlogCard item={item} key={item?.id} />
                      </div>
                    </Grid>
                    // </div>
                  );
                })
              ) : (
                <Skeleton_blogs />
              )}
            </Grid>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
