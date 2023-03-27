import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";
import { Fade } from "@mui/material";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { checkFav } from "@/api/functions/checkFavourite";
export default function ProductCard({ item, favouriteList }) {
  const router = useRouter();
  const redirecttodetails = (slug) => {
    router.push(`/game-details/${slug}`);
  };

  const isActive = useMemo(
    () => checkFav(favouriteList, item?.game_name),
    [favouriteList, item?.game_name]
  );

  return (
    <Fade in={true}>
      <div className="itemsWrapper">
        <div className="productCard">
          <div className="itemsFav">
            <WishlistHeart active={isActive} item={item} />
            {item?.discount && (
              <div className="itemsDiscount">
                <p>{item?.discount}% OFF</p>
              </div>
            )}
          </div>
          <figure onClick={() => redirecttodetails(item?.game_slug)}>
            <Image
              src={item?.game_thumbnail || ""}
              alt="Item"
              height={100}
              width={150}
              loading="lazy"
            />
          </figure>
          <div
            className="cardDetails cardDetailsGame"
            onClick={() => redirecttodetails(item?.game_slug)}
          >
            {item?.game_name && (
              <h4>
                {item?.game_name?.length > 10
                  ? item?.game_name?.slice(0, 10) + "..."
                  : item?.game_name}
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
