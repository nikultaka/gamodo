import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";
import { Fade } from "@mui/material";
import moment from "moment/moment";
import Link from "next/link";

function CommingsoonCard({ item, type }) {
  return (
    <div className="mainCommingCard">
      <Fade in={true}>
        <Link href={`/movie-trailer/${item?._id}`}>
          <div className="itemsWrapper">
            <div className="productCard">
              <figure>
                <Image
                  loading="lazy"
                  src={
                    (type = "comingsoonmovies"
                      ? item?.imageUrl || ""
                      : item?.image)
                  }
                  alt="Item"
                  height={160}
                  width={141}
                />
              </figure>
              <div className="cardDetails">
                <h4>
                  {item?.title?.length > 15
                    ? item?.title?.slice(0, 15) + "..."
                    : item?.title}
                </h4>
                <span>
                  Release: {moment(item?.releaseDate).format("DD MMM,YYYY")}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Fade>
    </div>
  );
}

export default CommingsoonCard;
