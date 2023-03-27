import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";
import { Fade } from "@mui/material";
import Rating from "@mui/material/Rating";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import assest from "@/json/assest";

function EbooksCard({ item }) {
  const [value, setValue] = React.useState(2);
  const router = useRouter();
  const routeToProductDetails = useCallback(() => {
    router.push("/product-details");
  }, []);

  return (
    <Fade in={true}>
      <div className="itemsWrapper" onClick={routeToProductDetails}>
        <div className="productCard">
          <div className="itemsFav">
            <div
              className={`iconHeart ${item?.isFav ? "iconHeartFilled" : ""}`}
            >
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.888 1.64942C17.7843 -0.542863 14.3683 -0.542863 12.2645 1.64942L10.8325 3.1335L9.40051 1.64421C7.29154 -0.54807 3.88075 -0.54807 1.777 1.64421C-0.592332 4.10727 -0.592332 8.10649 1.777 10.5695L10.8325 20L19.888 10.5748C22.2574 8.1117 22.2574 4.11248 19.888 1.64942Z" />
              </svg>
            </div>
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
              height={269}
              width={233}
              layout="responsive"
            />
          </figure>
          <div className="cardDetails">
            {item?.name && <h4>{item?.name}</h4>}
            {item?.author && <p>{item?.author}</p>}
            <div className="ratingsEbook">
              <Rating
                size="large"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <small>(4.5)</small>
            </div>
            <div className="playBtn">
              <MyButton>
                <Image
                  loading="lazy"
                  src={assest.pauseIcon}
                  alt="Pause"
                  height={40}
                  width={40}
                />
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default EbooksCard;
