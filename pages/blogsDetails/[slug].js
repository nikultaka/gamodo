import React, { useEffect } from "react";
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
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { blogsDetails } from "@/api/functions/GetProductDataList";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { Skeleton_blogDetails_image } from "@/components/Skeleton/Skeleton";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

const cookie = new Cookies();
function index({ data }) {
  const router = useRouter();
  const token = cookie.get("token");
  const {
    data: blogDetailsData,
    remove,
    refetch,
    isLoading: blogDetailsDataLoading,
  } = useQuery(
    "blogsDetails",
    async () => {
      return blogsDetails({
        token: token,
        slug: router?.query?.slug,
      });
    },
    {
      enabled: Boolean(token),
    }
  );

  useEffect(() => {
    remove();
    refetch();
  }, []);

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

  const highlightTitle = (content, link) => {
    try {
      let hightlight_regex = content;

      if (content?.length) {
        hightlight_regex = `${
          content?.includes("[…]") && content?.replace(/\[…]/g, "")
        } <a href=${link} target='_blank' style="color:#3877f2;"}> view more</a>`;
      }
      return hightlight_regex;
    } catch {
      return content;
    }
  };

  return (
    <div className={styles.page_product_details}>
      <div
        className={`${
          currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
        }`}
      ></div>
      <BackButton />
      <div className="commonTopTitle">
        <h3>Blog Detail</h3>
      </div>
      <div className="scrollSec">
        <div className={styles.productImage}>
          {!blogDetailsDataLoading ? (
            <figure>
              <Image
                loading="lazy"
                src={blogDetailsData?.image}
                alt="menu1"
                height={170}
                width={255}
              />
            </figure>
          ) : (
            <Skeleton_blogDetails_image />
          )}

          {/* <div className={styles.itemsDiscount}>
            <p>Save upto $100</p>
          </div> */}
          {/* <div className={styles.couponBtn}>
            <MyButton>Clip Coupon</MyButton>
          </div> */}
        </div>
        <div className={styles.product_description}>
          <div className={styles.productName}>
            <div className={styles.nameLeft}>
              {/* <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  "& svg": {
                    m: 1.5,
                  },
                  "& hr": {
                    mx: 0.5,
                  },
                }}
              >
                {blogDetailsData?.tags?.length > 1 ? (
                  blogDetailsData?.tags?.map((item, index) => (
                    <>
                      <p>
                        <b style={{ fontWeight: "1000" }}>{item}</b>
                      </p>
                      {index < blogDetailsData?.tags?.length - 1 && (
                        <>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ bgcolor: "black", height: "15px" }}
                          />
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ bgcolor: "black", height: "15px" }}
                          />
                        </>
                      )}
                    </>
                  ))
                ) : (
                  <p>
                    <b style={{ fontWeight: "1000" }}>
                      {
                        blogDetailsData?.result?.data?.game_details
                          ?.category_name
                      }
                    </b>
                  </p>
                )}
              </Box> */}
              <h4>{blogDetailsData?.title}</h4>
            </div>
            {/* <div className={styles.wishlistright}>
              <WishlistHeart size={20} enablePopEffect />
            </div> */}
          </div>
          <span>
            Expire on: {moment(blogDetailsData?.pubDate).format("DD MMM,YYYY")}
          </span>
          <h5>Description</h5>

          <p
            dangerouslySetInnerHTML={{
              __html: highlightTitle(
                blogDetailsData?.description,
                blogDetailsData?.link
              ),
            }}
          ></p>
        </div>
        {/* <div className="couponSlider">
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
        </div> */}
      </div>
    </div>
  );
}

export default index;
