import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";
import { Fade } from "@mui/material";
import moment from "moment";

function CategoryContentCard({ item }) {
  const router = useRouter();

  const routeToProductDetails = useCallback(() => {
    router.push("/product-details");
  }, []);

  const blog_details_page_redirect = (id) => {
    if (id) {
      router.push(`/category-content-details/${id}`);
    }
  };
  // console.log('iem',item)

  const blog_btn_redirect = (url) => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <Fade in={true}>
      <div className="itemsWrapper">
        <div
          className="productCard"
          onClick={() => blog_details_page_redirect(item?.post_slug)}
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
            {/* {item?.discount && (
              <div className="itemsDiscount">
                <p>{item?.discount}% OFF</p>
              </div>
            )} */}
          </div>
          <figure>
            <Image
              loading="lazy"
              className="blogs_card"
              src={item?.post_thumbnail || ""}
              alt="Item"
              height="150"
              width="150"
              layout="responsive"
            />
          </figure>
          <div className="cardDetails">
            {/* {item?.pubDate && (
              <p className="blueDate">
                {moment(item?.pubDate).format("DD MMM,YYYY")}
              </p>
            )} */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                  }}>{item?.post_title}
                </h4>
              </div>
              <div>
                <button
                  onClick={() => blog_btn_redirect(item
                    ?.post_external_url)}
                  style={{
                    background: 'rgba(24, 119, 242, 0.2)',
                    borderRadius: "10px",
                    width: "91px",
                    height: "30px",
                    color: '#1877F2'
                  }}>{item?.button_name}
                </button>
              </div>
            </div>
            {item?.post_description && (
              <p
                // style={{ marginTop: "10px" }}
                dangerouslySetInnerHTML={{
                  __html:
                    item?.post_description?.length > 80
                      ? item?.post_description?.slice(0, 80) + "..."
                      : item?.post_description

                }}>


                {/* {item?.post_description?.length > 80
                  ? item?.post_description?.slice(0, 80) + "..."
                  : item?.post_description} */}
              </p>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default CategoryContentCard;
