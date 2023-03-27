import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useCallback } from "react";
import { Fade } from "@mui/material";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { useDispatch, useSelector } from "react-redux";
import useNotiStack from "@/hooks/useNotistack";
import {
  clear_save_fav_status,
  getMyFavourite,
} from "@/reduxtoolkit/profile.slice";
import { checkFav } from "@/api/functions/checkFavourite";
export default function FavouriteList({ item, type, favouriteList }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { save_fav_status } = useSelector((state) => state?.profile);
  const routeToProductDetails = useCallback((event) => {
    if (!event.target.classList.contains("no-redirect")) {
      router.push("/product-details");
    }
  }, []);

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
              loading="lazy"
              src={item?.game_thumbnail || ""}
              alt="Item"
              height={100}
              width={150}
              layout="responsive"
            />
          </figure>
          <div
            className="cardDetails favouriteCard"
            onClick={() => redirecttodetails(item?.game_slug)}
          >
            {item?.game_name && (
              <h4>
                {item?.game_name?.length > 15
                  ? item?.game_name?.slice(0, 15) + "..."
                  : item?.game_name}{" "}
              </h4>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
