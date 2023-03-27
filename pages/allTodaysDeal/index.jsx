import assest from "@/json/assest";
import Wrapper from "@/layout/Wrappers/Wrapper";
import React, { useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import ProductCard from "@/components/ProductCard/AllstoreListCard";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

export default function index() {
  const todaysDeals = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Cafe Escapes Chai",
        image: assest.product01,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai",
        image: assest.product02,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Needs for speed",
        image: assest.product06,
        category: "Sports,Racing",
        discount: 20,
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        isFav: true,
        name: "Subway Surfer",
        image: assest.product04,
        expiryDate: "10/31",
        category: "Sports,Arcade Fun",
      },
    ];
  }, []);
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
  return (
    <div>
      <Wrapper type={"alltodaysdeals"}/>
      <SingleHeader type={"alltodaysdeals"}/>
      <div className="pagebody">
        <div className="couponSlider">
          <div className="secHeading">
            <h3>Today's Deal</h3>
            <Link href="/">View more</Link>
          </div>
          <div className="itemsCarousel">
            <Slider {...settings}>
              {todaysDeals.map((item) => (
                <ProductCard item={item} key={item?.id} type={"alltodaysdeals"}/>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
