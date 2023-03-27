import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";

import { Fade } from "@mui/material";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import moment from "moment";
export default function ProductCard({ item }) {
  const router = useRouter();
  const routeToProductDetails = useCallback((event) => {
    if (!event.target.classList.contains("no-redirect")) {
      router.push("/product-details");
    }
  }, []);
  return (
    <Fade in={true}>
      <div className="itemsWrapper" onClick={routeToProductDetails}>
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
              loading="lazy"
              src={item?.image || ""}
              alt="Item"
              height={100}
              width={150}
            />
          </figure>
          <div className="cardDetails">
            {item?.name && (
              <h4>
                {item?.name?.length > 15
                  ? item?.name?.slice(0, 15) + "..."
                  : item?.name}
              </h4>
            )}
            {item?.category && <p>{item?.category}</p>}
            {item?.expiryDate && (
              <span>
                Expire: {moment(item?.expiryDate).format("DD MMM,YYYY")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
