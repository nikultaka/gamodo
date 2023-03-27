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
export default function ProductCard({ item }) {
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
          <Link target="_blank" href={item?.link_url}>
            {" "}
            <figure>
              <Image
                loading="lazy"
                src={item?.thumbnail || ""}
                alt="Item"
                height={100}
                width={150}
              />
            </figure>
          </Link>
          <div className="cardDetails">
            {item?.product_title && (
              <h4>
                {item?.product_title?.length > 15
                  ? item?.product_title?.slice(0, 20) + "..."
                  : item?.product_title}
              </h4>
            )}
            {item?.primary_category && <p>{item?.primary_category}</p>}
            {item?.product_brand && <p>{item?.product_brand}</p>}

            {item?.expiryDate && <span>Expire: {item?.expiryDate}</span>}
          </div>
        </div>
      </div>
    </Fade>
    // {/* </Link> */}
  );
}
