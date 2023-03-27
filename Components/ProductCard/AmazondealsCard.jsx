import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";

import { Fade } from "@mui/material";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import Link from "next/link";
export default function ProductCard({ item, type }) {
  // const routeToProductDetails = useCallback((event) => {
  //     if (!event.target.classList.contains("no-redirect")) {
  //         router.push("/product-details");
  //     }
  // }, []);
  return (
    <Link target="_blank" href={`${item?.link_url && item?.link_url}`}>
      <Fade in={true}>
        <div className="itemsWrapper">
          <div className="productCard">
            <div className="itemsFav">
              {/* <WishlistHeart active={item?.isFav} /> */}
              {item?.discount && (
                <div className="itemsDiscount">
                  <p>{item?.discount}% OFF</p>
                </div>
              )}
            </div>
            <figure>
              <Image
                src={type == "coupons" ? item?.image : item?.thumbnail || ""}
                alt="Item"
                height={100}
                width={150}
                loading="lazy"
              />
            </figure>
            <div className="cardDetails">
              {type == "coupons"
                ? item?.name && <h4>{item?.name.slice(0, 20)}...</h4>
                : item?.product_title && (
                    <h4>{item?.product_title.slice(0, 20)}...</h4>
                  )}

              {type == "coupons"
                ? item?.category && <p>{item?.category}</p>
                : item?.primary_category && <p>{item?.primary_category}</p>}
              {item?.product_brand && <p>{item?.product_brand}</p>}

              {item?.expiryDate && <span>Expire: {item?.expiryDate}</span>}
            </div>
          </div>
        </div>
      </Fade>
    </Link>
  );
}
