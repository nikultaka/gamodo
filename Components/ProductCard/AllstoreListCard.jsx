import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { Fade } from "@mui/material";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import Link from "next/link";
import { saveFavourite } from "@/reduxtoolkit/profile.slice";
import { useDispatch } from "react-redux";
export default function ProductCard({ item, type }) {
  const router = useRouter();
  // const routeToProductDetails = useCallback((event) => {
  //     if (!event.target.classList.contains("no-redirect")) {
  //         router.push("/product-details");
  //     }
  // }, []);
  const dispatch = useDispatch();

  // const wishListIcon = async ()=>{
  //   const data = {
  //     source: "external",
  //     slug: "	donut-crush-saga"
  //   }
  //    dispatch(saveFavourite(data));

  // }
  return (
    // <Link target="_blank" href={item?.link_url}>
    //   {" "}
    <Fade in={true}>
      <div className="itemsWrapper">
        <div className="productCard">
          <div className="itemsFav">
            {/* <WishlistHeart active={item?.isFav} item={item} /> */}
            {item?.discount && (
              <div className="itemsDiscount">
                <p>{item?.discount}% OFF</p>
              </div>
            )}
          </div>
          <Link target="_blank" href="#">
            {" "}
            <figure>
              <Image
                src={
                  type == "alltodaysdeals"
                    ? item?.image
                    : type == "storelist"
                    ? item?.image
                    : item?.thumbnail || ""
                }
                alt="Item"
                height={100}
                width={150}
                loading="lazy"
              />
            </figure>
          </Link>
          <div className="cardDetails">
            {type == "alltodaysdeals" || type == "storelist"
              ? item?.name && <h4>{item?.name.slice(0, 20)}...</h4>
              : item?.product_title && (
                  <h4>{item?.product_title.slice(0, 20)}...</h4>
                )}
            {type == "alltodaysdeals" || type == "storelist"
              ? item?.category && <p>{item?.category}</p>
              : item?.primary_category && <p>{item?.primary_category}</p>}
            {item?.product_brand && <p>{item?.product_brand}</p>}

            {item?.expiryDate && <span>Expire: {item?.expiryDate}</span>}
          </div>
        </div>
      </div>
    </Fade>
    // {/* </Link> */}
  );
}
