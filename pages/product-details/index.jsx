import React, { useCallback } from "react";
import styles from "@/styles/pages/productdetails.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import Image from "next/image";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import Wrapper from "@/layout/Wrappers/Wrapper";
import moment from "moment";
import { getHostName } from "@/lib/functions/_common.lib";
import Router, { useRouter } from "next/router";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

function index({ data }) {
  const router = useRouter();
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
    <div className={styles.page_product_details}>
      <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      ></div>
      <BackButton />
      <div className="commonTopTitle">
        <h3>Product Detail</h3>
      </div>
      <div className="scrollSec">
        <div className={styles.productImage}>
          <figure>
            <Image
              loading="lazy"
              src={assest.tv}
              alt="menu1"
              height={170}
              width={255}
            />
          </figure>
          <div className={styles.itemsDiscount}>
            <p>Save upto $100</p>
          </div>
          <div className={styles.couponBtn}>
            <MyButton>Clip Coupon</MyButton>
          </div>
        </div>
        <div className={styles.product_description}>
          <div className={styles.productName}>
            <div className={styles.nameLeft}>
              <p>Wallmart</p>
              <h4>Reason 32 inch Led Smart TV</h4>
            </div>
            <div className={styles.wishlistright}>
              <WishlistHeart size={20} enablePopEffect />
            </div>
          </div>
          <span>Expire on: {moment("10/31/2022").format("DD MMM,YYYY")}</span>
          <h5>Description</h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
        </div>
        <div className="couponSlider">
          <div className="secHeading">
            <h3>Related Coupons</h3>
          </div>
          <div className="itemsCarousel">
            <Slider {...settings}>
              {couponsData.map((item) => (
                <ProductCard item={item} key={item?.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
