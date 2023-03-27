//* *  PROJECT IMPORTS   */
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import assest from "@/json/assest";
import { useMemo } from "react";
import FavouriteList from "@/components/ProductCard/FavouriteList";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  clear_save_fav_status,
  getMyFavourite,
} from "@/reduxtoolkit/profile.slice";
import useNotiStack from "@/hooks/useNotistack";
import { Grid } from "@mui/material";
import { Skeleton_favourite } from "@/components/Skeleton/Skeleton";
import Wrapper from "@/layout/Wrappers/Wrapper";

export default function Index({}) {
  const dispatch = useDispatch();
  const { toastSuccess, toastError } = useNotiStack();
  const { save_fav_status } = useSelector((state) => state?.profile);
  const { favourite_list, status } = useSelector((state) => state?.profile);

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

  useEffect(() => {
    if (save_fav_status == 0) {
      const data = {
        source: "external",
        image_size: "THUMBNAIL",
        start_page: "all",
      };
      dispatch(getMyFavourite(data));
      toastSuccess("Successfully removed from favourite list");
    }
  }, [save_fav_status]);

  useEffect(() => {
    if (save_fav_status == 0) {
      dispatch(clear_save_fav_status(null));
    }
  }, [save_fav_status]);

  return (
    <Wrapper type={"favourite"}>
      <SingleHeader type={"favourite"} />
      <div className="pagebody">
        <div className="couponSlider moreGame">
          {/* <div className="secHeading" style={{ paddingLeft: "0px" }}>
            <h3>Today’s Coupon</h3>
          </div>

          <div className="itemsCarousel">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {couponsData?.map((item) => {
                return (
                  <Grid item sm={6} xs={6}>
                    <ProductCard item={item} key={item?.id} type={"coupons"} />
                  </Grid>
                );
              })}
            </Grid>
          </div> */}

          {/* <div className="itemsCarousel">
            <Slider {...settings}>
              {couponsData?.length > 0 &&
                couponsData?.map((item) => (
                  <ProductCard item={item} key={item?.id} type={"coupons"} />
                ))}
            </Slider>
          </div> */}
        </div>
        <div className="couponSlider moreGame">
          <div className="secHeading" style={{ paddingLeft: "0px" }}>
            <h3>Favourite Items</h3>
            {/* <Link href="/">View more</Link> */}
          </div>
          {/* <div className="itemsCarousel"> */}
          {/* <Slider {...settings}> */}
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {status == "idle" ? (
              favourite_list?.map((item) => (
                <Grid item sm={6} xs={6}>
                  <div className="secHeading">
                    <h3>{item?.groupName}</h3>
                    {/* <Link href="/">View more</Link> */}
                  </div>
                  <div className="itemsCarousel">
                    {/* <Slider {...settings}> */}
                    {/* {item?.map((item) => ( */}

                    <FavouriteList
                      item={item}
                      key={item?.id}
                      favouriteList={favourite_list}
                      type={"favourite"}
                    />
                    {/* ))} */}
                    {/* </Slider> */}
                  </div>
                </Grid>
              ))
            ) : (
              <Skeleton_favourite />
            )}
          </Grid>

          {/* </Slider> */}
          {/* </div> */}
        </div>
      </div>
    </Wrapper>
  );
}
