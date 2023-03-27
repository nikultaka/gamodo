import React from "react";
import styles from "@/styles/pages/productdetails.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import Image from "next/image";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import Footer from "@/layout/Footers/Footer";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

function index({ data }) {
  const { availableThemes, currentTheme } = useGamodoTheme();
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
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const gamesData = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Subway Surfer",
        image: assest.product04,
        category: "Sports,Arcade Fun",
      },
      {
        id: Math.random(),
        name: "Snipper Fury",
        image: assest.product05,
        category: "Sports,Arcade Fun",
      },
      {
        id: Math.random(),
        name: "Needs for speed",
        image: assest.product06,
        isFav: true,
        discount: 20,
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Subway Surfer",
        image: assest.product04,
        expiryDate: "10/31",
      },
    ];
  }, []);

  return (
    <div className={styles.page_product_details}>
      <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      ></div>
      <BackButton />
      <div className="commonTopTitle">
        <h3>Game</h3>
      </div>
      <div className={styles.trailerVdo}>
        <div className="videoGame">
          <Image
            loading="lazy"
            src={assest.game01}
            alt="game"
            height={170}
            width={255}
            layout="responsive"
          />
        </div>
        <div className={styles.couponBtn}>
          <MyButton>Play Now</MyButton>
        </div>
      </div>
      <div className={styles.product_description}>
        <div className={styles.productName}>
          <div className={styles.nameLeft}>
            <p>Sports, Arcade Fun </p>
            <h4>Mini Golf</h4>
          </div>
          <div className={styles.wishlistright}>
            <WishlistHeart size={20} enablePopEffect />
          </div>
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </p>
      </div>
      <div className="couponSlider">
        <div className="secHeading">
          <h3>Related Games</h3>
        </div>
        <div className="itemsCarousel">
          <Slider {...settings}>
            {gamesData.map((item) => (
              <ProductCard item={item} key={item?.id} />
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default index;
