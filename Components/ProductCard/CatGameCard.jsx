import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import { Fade, Grid } from "@mui/material";
import WishlistHeart from "@/ui/Wishlist/WishlistHeart";
import { checkFav } from "@/api/functions/checkFavourite";
export default function ProductCard({ item, type, favouriteList }) {
  // const [isFavouriteSlug, setIsFavouriteSlug] = useState("")

  const router = useRouter();
  // const routeToProductDetails = useCallback((event) => {
  //   if (!event.target.classList.contains("no-redirect")) {
  //     router.push("/product-details");
  //   }
  // }, []);

  const redirecttodetails = (slug) => {
    if (type == "allcomingnextpath") {
      router.push(`/game-details/${slug}`);
    } else {
      router.push(`/game-details/${slug}`);
    }
  };
  const isActive = useMemo(
    () => checkFav(favouriteList, item?.game_name),
    [favouriteList, item?.game_name]
  );

  return (
    <>
      {
        <Box sx={{ flexGrow: 1 }}>
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
                <figure
                  onClick={() =>
                    redirecttodetails(item?.game_slug, "allcomingnextpath")
                  }
                >
                  <Image
                    loading="lazy"
                    src={item?.game_thumbnail || ""}
                    alt="Item"
                    height={100}
                    width={150}
                  />
                </figure>
                <div
                  className="cardDetails cardDetailsGame"
                  onClick={() => redirecttodetails(item?.game_slug)}
                >
                  {item?.game_name && (
                    <h4>
                      {item?.game_name?.length > 15
                        ? item?.game_name?.slice(0, 15) + "..."
                        : item?.game_name}
                    </h4>
                  )}
                  {item?.category && <p>{item?.category}</p>}
                  {item?.expiryDate && <span>Expire: {item?.expiryDate}</span>}
                </div>
              </div>
            </div>
          </Fade>
        </Box>
      }
    </>
  );
}
