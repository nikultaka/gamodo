import EbooksCard from "@/components/ProductCard/EbooksCard";
import Wrapper from "@/layout/Wrappers/Wrapper";
import Link from "next/link";
import React, { useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import assest from "@/json/assest";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { getHostName } from "@/lib/functions/_common.lib";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

export default function index() {
  const headerRef = useRef(null);
  const { availableThemes, currentTheme } = useGamodoTheme();
  var ebooks = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.6,
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
          slidesToShow: 1.6,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const ebookCards = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Hidden Federation",
        image: assest.ebook01,
        isFav: true,
        discount: 80,
        author: "By: Tony Harmsworth",
      },
      {
        id: Math.random(),
        name: "The Lies I Tell",
        image: assest.ebook02,
        isFav: false,
        discount: 80,
        author: "By: Tony Harmsworth",
      },
      {
        id: Math.random(),
        name: "Hidden Federation",
        image: assest.ebook01,
        isFav: true,
        discount: 80,
        author: "By: Tony Harmsworth",
      },
    ];
  }, []);
  return (
    <div>
      <Wrapper type={"ebooks"} />
      <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      ></div>

      <div className="commonTopTitle" ref={headerRef}>
        <h3>All EBooks</h3>
      </div>
      <BackButton />
      {/* <SingleHeader type={"ebooks"}/> */}
      <div className="pagebody">
        <div className="couponSlider">
          <div className="secHeading">
            <h3>Ebooks</h3>
            <Link href="">View more</Link>
          </div>
          <div className="itemsCarousel">
            <Slider {...ebooks}>
              {ebookCards.map((item) => (
                <EbooksCard item={item} key={item?.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
