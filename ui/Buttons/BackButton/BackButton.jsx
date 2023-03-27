import { Fade, styled } from "@mui/material";
import Router, { useRouter } from "next/router";
import React, { forwardRef, useCallback } from "react";
import MyButton from "../MyButton/MyButton";

const StyledDiv = styled("div")`
  button {
    background-color: var(--pageBackBtnBg);
    min-width: 1px;
    padding: 12px 16px;
    box-shadow: 0px 0px 4px rgb(0 0 0 / 25%);
    border-radius: 5px;
    position: absolute;
    /* position: fixed; */
    left: 20px;
    top: 30px;
    z-index: 1;

    svg {
      path {
        fill: var(--defaultIconColor);
      }
    }

    &:hover {
      background-color: var(--pageBackBtnBg);
    }
  }
`;

const BackButton = forwardRef(function BackButton({ onClick, ...rest }, ref) {
  const router = useRouter();
  const deterMineClick = useCallback(() => {
    if (onClick && typeof onClick === "function") {
      onClick();
    } else {
      router.back();
    }
  }, [onClick, router]);

  return (
    <Fade in={true} unmountOnExit mountOnEnter ref={ref}>
      <StyledDiv onClick={deterMineClick} {...rest}>
        <MyButton>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00333 16C7.88637 16.0007 7.77043 15.9782 7.66215 15.934C7.55388 15.8898 7.4554 15.8246 7.37236 15.7423L0.262872 8.63278C0.179577 8.55016 0.113464 8.45187 0.0683463 8.34358C0.0232289 8.23528 0 8.11913 0 8.00181C0 7.88449 0.0232289 7.76834 0.0683463 7.66004C0.113464 7.55175 0.179577 7.45346 0.262872 7.37084L7.37236 0.261355C7.5397 0.0940123 7.76667 0 8.00333 0C8.23999 0 8.46695 0.0940123 8.63429 0.261355C8.80164 0.428698 8.89565 0.655664 8.89565 0.892322C8.89565 1.12898 8.80164 1.35595 8.63429 1.52329L2.14689 8.00181L8.63429 14.4803C8.71759 14.5629 8.7837 14.6612 8.82882 14.7695C8.87394 14.8778 8.89717 14.994 8.89717 15.1113C8.89717 15.2286 8.87394 15.3448 8.82882 15.4531C8.7837 15.5614 8.71759 15.6596 8.63429 15.7423C8.55126 15.8246 8.45278 15.8898 8.3445 15.934C8.23623 15.9782 8.12028 16.0007 8.00333 16Z"
              fill="white"
            />
          </svg>
        </MyButton>
      </StyledDiv>
    </Fade>
  );
});

export default BackButton;
