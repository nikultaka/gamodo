import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";
import { Fade } from "@mui/material";
import moment from "moment";

function BlogCard({ item }) {
  const router = useRouter();
  const routeToProductDetails = useCallback(() => {
    router.push("/product-details");
  }, []);

  const blog_details_page_redirect = (id) => {
    if (id) {
      router.push(`/blogsDetails/${id}`);
    }
  };
  return (
    <Fade in={true}>
      <div className="itemsWrapper">
        <div
          className="productCard"
          onClick={() => blog_details_page_redirect(item?._id)}
        >
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
              className="blogs_card"
              src={item?.image || ""}
              alt="Item"
              height="150"
              width="150"
              layout="responsive"
            />
          </figure>
          <div className="cardDetails">
            {item?.pubDate && (
              <p className="blueDate">
                {moment(item?.pubDate).format("DD MMM,YYYY")}
              </p>
            )}
            {item?.description && (
              <h4>
                {item?.description?.length > 80
                  ? item?.description?.slice(0, 80) + "..."
                  : item?.description}
              </h4>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default BlogCard;
