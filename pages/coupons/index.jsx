import ProductCard from "@/components/ProductCard/ProductCard";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import React, { useMemo } from "react";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { getHostName } from "@/lib/functions/_common.lib";
import Wrapper from "@/layout/Wrappers/Wrapper";

export default function index() {
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

  
  return (
    <div>
      <Wrapper type={"coupons"}>
      <SingleHeader type={"coupons"} />
        <div className="pagebody">
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Today’s Coupon</h3>
              <Link href="">View more</Link>
            </div>
            <div className="itemsCarousel">
              <Slider {...settings}>
                {couponsData?.length > 0 &&
                  couponsData?.map((item) => (
                    <ProductCard item={item} key={item?.id} type={"coupons"} />
                  ))}
              </Slider>
            </div>
          </div>
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Expiring soon</h3>
              <Link href="">View more</Link>
            </div>
            <div className="itemsCarousel">
              <Slider {...settings}>
                {couponsData?.length > 0 &&
                  couponsData?.map((item) => (
                    <ProductCard item={item} key={item?.id} type={"coupons"} />
                  ))}
              </Slider>
            </div>
          </div>
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Online special</h3>
              <Link href="">View more</Link>
            </div>
            <div className="itemsCarousel">
              <Slider {...settings}>
                {couponsData?.length > 0 &&
                  couponsData?.map((item) => (
                    <ProductCard item={item} key={item?.id} type={"coupons"} />
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
