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
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import CachedIcon from '@mui/icons-material/Cached';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticate } from "@/reduxtoolkit/profile.slice";

export default function index() {
  const router = useRouter();
  const dispatch = useDispatch();
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

  const onClickBtn = () => {
    dispatch(setIsAuthenticate(false))
    router.push("/home_")
  }


  return (
    <div style={{
      height: "100vh", display: "flex"
      , justifyContent: "center", alignItems: "center"
    }}>
      <Wrapper type={"coupons"} disableFooter>
        {/* <SingleHeader type={"coupons"} /> */}
        <div className="pagebody">
          <h1>Client’s website</h1>

          <div className="primaryBtn profilebutton">
            <MyButton
              onClick={() => onClickBtn()}
            >
              <CachedIcon />&nbsp;  Go to Daily Rewards
            </MyButton>
          </div>

          <div>
            <span>One or more points goes unchecked</span>
          </div>


        </div>
      </Wrapper>
    </div>
  );
}
