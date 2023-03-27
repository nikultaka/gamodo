import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useCallback } from "react";
import { Fade } from "@mui/material";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { highlightTitle } from "@/api/functions/auth";
import { checkFav } from "@/api/functions/checkFavourite";
export default function ProductCard({ item, searchText, favouriteList, type }) {

  const router = useRouter();
  const textSplit = router?.query?.id && router?.query?.id?.split("+");
  const text =
    (textSplit?.length > 0 || textSplit?.length == 0) &&
    textSplit[0]?.toLowerCase();

  const routeToProductDetails = useCallback((event) => {
    if (!event.target.classList.contains("no-redirect")) {
      router.push("/product-details");
    }
  }, []);

  const redirecttodetails = (slug) => {
    if (type == "allcomingnextpath") {
      router.push(`/game-details/${slug}`);
    } else if (type == "targetDealsSearch") {
      window.open(item?.link_url);
    } else if (type == "amazondealsSearch") {
      window.open(item?.link_url);
    } else if (type == "walmartDealsSearch") {
      window.open(item?.link_url);
    } else {
      router.push(`/game-details/${slug}`);
    }
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
            <WishlistHeart active={isActive} item={item} type={type} />
            {item?.discount && (
              <div className="itemsDiscount">
                <p>{item?.discount}% OFF</p>
              </div>
            )}
          </div>
          <figure onClick={() => redirecttodetails(item?.game_slug)}>
            <Image
              loading="lazy"
              src={
                type == "amazondealsSearch" ||
                type == "walmartDealsSearch" ||
                type == "targetDealsSearch"
                  ? item?.thumbnail
                  : item?.game_thumbnail
              }
              alt="Item"
              height={100}
              width={150}
            />
          </figure>
          <div
            variant="h4"
            className="cardDetails cardDetailsGame"
            onClick={() => redirecttodetails(item?.game_slug)}
          >
            {type == "amazondealsSearch" ||
            type == "walmartDealsSearch" ||
            type == "targetDealsSearch" ? (
              item?.product_title && (
                <h4
                  dangerouslySetInnerHTML={{
                    __html: highlightTitle(
                      item?.product_title?.length > 15
                        ? item?.product_title?.slice(0, 15)?.toLowerCase() +
                            "..."
                        : item?.product_title?.toLowerCase(),
                      text
                    ),
                  }}
                ></h4>
              )
            ) : item?.game_name && type == "searchGame" ? (
              <h4
                dangerouslySetInnerHTML={{
                  __html: highlightTitle(
                    item?.game_name?.length > 15
                      ? item?.game_name?.slice(0, 15)?.toLowerCase() + "..."
                      : item?.game_name?.toLowerCase(),
                    text
                  ),
                }}
              ></h4>
            ) : (
              <h4>
                {item?.game_name?.length > 15
                  ? item?.game_name?.slice(0, 15) + "..."
                  : item?.game_name}
              </h4>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
