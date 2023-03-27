import { Box, styled } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getMyFavourite, saveFavourite } from "@/reduxtoolkit/profile.slice";

const $fireworksWidth = 3;
const $fireworksHeight = 3;
const $fireworksBorder = $fireworksWidth / 2;
const StyledIconHeartContainer = styled(Box)`
  // fireworks

  .iconHeartFilled {
    fill: var(--wishListIconFilled);
    color: var(--wishListIconFilled);
  }

  .icon-svg {
    display: inline-block;
    vertical-align: middle;
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
  }

  .iconHeartFilled {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  .btn__effect {
    display: inline-block;
    position: relative;
  }

  .iconHeart {
    path {
      fill: var(--wishListIcon);
    }
  }

  .effect-group {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(25deg);
    .effect {
      display: block;
      position: absolute;
      top: 38%;
      left: 50%;
      width: 20px;
      transform-origin: 0px 2px;
      &:nth-child(2) {
        transform: rotate(72deg);
      }
      &:nth-child(3) {
        transform: rotate(144deg);
      }
      &:nth-child(4) {
        transform: rotate(216deg);
      }
      &:nth-child(5) {
        transform: rotate(288deg);
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        border-radius: ${$fireworksBorder}px;
        height: ${$fireworksHeight}px;
        background: var(--wishListIconFilled);
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 10px;
        right: 10%;
        border-radius: 50%;
        width: ${$fireworksWidth}px;
        height: ${$fireworksHeight}px;
        background: #ff5858;
        transform: scale(0, 0);
      }
    }
  }

  &.active {
    .iconHeart {
      opacity: 0;
    }
    .iconHeartFilled {
      opacity: 1;
    }
    .icon-svg {
      animation: bounceIn 0.5s linear;
    }
    .effect:before {
      animation: fireworkLine 0.5s linear 0.2s;
    }
    .effect:after {
      animation: fireworkPoint 0.5s linear 0.2s;
    }
  }

  .broken-heart {
    position: absolute;
    left: -16px;
    top: 0;
    opacity: 0;
    g {
      fill: var(--wishListIconFilled);
    }
    &--left {
      transform: rotate(0deg);
      transform-origin: 60% 200%;
    }
    &--right {
      transform: rotate(0deg);
      transform-origin: 63% 200%;
    }
    &--crack {
      stroke-dasharray: 15;
      stroke-dashoffset: 15;
    }
  }

  &.deactivate {
    .broken-heart {
      opacity: 1;
    }
    .broken-heart--left {
      animation: crackLeft 0.35s cubic-bezier(0.68, -0.55, 0.265, 2.85) 0.15s
          forwards,
        hide 0.25s ease-in 0.55s forwards;
    }
    .broken-heart--right {
      animation: crackRight 0.35s cubic-bezier(0.68, -0.55, 0.265, 2.85) 0.15s
          forwards,
        hide 0.25s ease-in 0.55s forwards;
    }
    .broken-heart--crack {
      animation: crack 0.2s ease-in forwards;
    }
  }

  // ANIMATIONS

  // fireworks animations
  @keyframes fireworkLine {
    0% {
      right: 20%;
      transform: scale(0, 0);
    }
    25% {
      right: 20%;
      width: 6px;
      transform: scale(1, 1);
    }
    35% {
      right: 0;
      width: 35%;
    }
    70% {
      right: 0;
      width: 4px;
      transform: scale(1, 1);
    }
    100% {
      right: 0;
      transform: scale(0, 0);
    }
  }
  @keyframes fireworkPoint {
    30% {
      transform: scale(0, 0);
    }
    60% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(0, 0);
    }
  }

  @keyframes bounceIn {
    0% {
      transform: scale(0);
    }
    30% {
      transform: scale(1.25);
    }
    50% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1.1);
    }
    80% {
      transform: scale(1);
    }
  }

  // WIP deactivate state
  @keyframes crackLeft {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-45deg);
    }
  }

  @keyframes crackRight {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }

  @keyframes crack {
    0% {
      stroke-dasharray: 15;
      stroke-dashoffset: 15;
    }
    80% {
      stroke-dasharray: 15;
      stroke-dashoffset: 0;
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
export default function WishlistHeart({
  active = false,
  size = 16,
  enablePopEffect,
  item,
  type,
}) {
  const [isFav] = useState(active);
  const initiallyLoaded = useRef(false);
  const iconHeartContainerRef = useRef(null);

  useEffect(() => {
    if (initiallyLoaded.current) {
      toggleClasses(undefined, active, true);
    }
    if (!initiallyLoaded.current) {
      initiallyLoaded.current = true;
    }
  }, [active]);
  const dispatch = useDispatch();

  const toggleClasses = useCallback(
    (event, active, omit = false) => {
      const container = iconHeartContainerRef.current;
      if (container) {
        if (typeof active !== "undefined") {
          if (active) {
            container.classList.add("active");
            container.classList.remove("deactivate");
          } else {
            container.classList.remove("active");
            container.classList.add("deactivate");
          }
        } else {
          const data = {
            source: "external",
            slug: item?.game_slug && item?.game_slug,
          };
          dispatch(saveFavourite(data))?.then((res)=>{
            const data = {
              source: "external",
              image_size: "THUMBNAIL",
              start_page: "all",
            };
            dispatch(getMyFavourite(data));
          });
          if (!container.classList.contains("active")) {
            container.classList.add("active");
            container.classList.remove("deactivate");
          } else {
            container.classList.remove("active");
            container.classList.add("deactivate");
          }
        }
      }
    },
    [item]
  );

  return (
    <StyledIconHeartContainer
      className={`no-redirect ${isFav ? "active" : ""}`}
      onClick={toggleClasses}
      ref={iconHeartContainerRef}
      size={size}
    >
      {type !== "amazondealsSearch" &&
        type !== "walmartDealsSearch" &&
        type !== "targetDealsSearch" && (
          <div className="btn__effect  no-redirect">
            <svg
              className="iconHeart icon-svg no-redirect"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="no-redirect"
                d="M19.888 1.64942C17.7843 -0.542863 14.3683 -0.542863 12.2645 1.64942L10.8325 3.1335L9.40051 1.64421C7.29154 -0.54807 3.88075 -0.54807 1.777 1.64421C-0.592332 4.10727 -0.592332 8.10649 1.777 10.5695L10.8325 20L19.888 10.5748C22.2574 8.1117 22.2574 4.11248 19.888 1.64942Z"
              />
            </svg>

            <svg
              className="iconHeartFilled icon-svg no-redirect"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="no-redirect"
                d="M19.888 1.64942C17.7843 -0.542863 14.3683 -0.542863 12.2645 1.64942L10.8325 3.1335L9.40051 1.64421C7.29154 -0.54807 3.88075 -0.54807 1.777 1.64421C-0.592332 4.10727 -0.592332 8.10649 1.777 10.5695L10.8325 20L19.888 10.5748C22.2574 8.1117 22.2574 4.11248 19.888 1.64942Z"
              />
            </svg>

            {enablePopEffect && (
              <div className="effect-group no-redirect">
                <span className="effect  no-redirect"></span>
                <span className="effect no-redirect"></span>
                <span className="effect no-redirect"></span>
                <span className="effect no-redirect"></span>
                <span className="effect no-redirect"></span>
              </div>
            )}
          </div>
        )}
    </StyledIconHeartContainer>
  );
}
