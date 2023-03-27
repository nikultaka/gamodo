import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";

function UpcommingMoviesCard({ item }) {
  const [imageUrl, setImageUrl] = useState(item?.imageUrl);
  return (
    <div className="pagemovieCard">
      <Link id={item?._id} href={`/movie-trailer/${item?._id}`}>
        <div
          className="itemsWrapper"
          //  onClick={routeToProductDetails}
        >
          <div className="productCard moviesCard">
            <figure>
              <Image
                loading="lazy"
                src={imageUrl || ""}
                alt="Item"
                height={100}
                width={150}
                // style={{ maxHeight: "190px" }}
                // layout="responsive"
                onError={() => {
                  setImageUrl("/assets/images/notFound.png");
                }}
              />
            </figure>
            <div className="cardDetails">
              {item?.title && (
                <h4>
                  {item?.title?.length > 15
                    ? item?.title?.slice(0, 15) + "..."
                    : item?.title}
                </h4>
              )}
              {item?.releaseDate && (
                <span>
                  Release: {moment(item?.releaseDate).format("DD MMM,YYYY")}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UpcommingMoviesCard;
