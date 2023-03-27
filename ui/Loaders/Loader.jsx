import assest from "@/json/assest";
import { Box, Fade, styled } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const LoaderContainer = styled(Box, {
  shouldForwardProp: (propName) =>
    propName !== "background" && propName !== "fullScreen",
})`
  background: ${({ background }) =>
    background ? background : "var(--bodyBackground)"};
  height: ${({ fullScreen }) => (fullScreen ? "100vh" : "100%")};
  width: 100%;
  z-index: 9999999;
  position: absolute;
  top: 0;
  left: 0;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 100%;
    width: 100%;
    animation: load 1.2s infinite 0s ease-in-out;
    animation-direction: alternate;
  }
`;

export default function Loader({ img, fullScreen, background, open, ...rest }) {
  const dispatch = useDispatch();
  const [unmount, setUnmount] = useState(open);
  const { siteConfigs } = useSelector((state) => state?.gamodoConfig);

  //you can't understand that?
  useEffect(() => {
    if (!unmount) {
      setUnmount(open);
    }
  }, [open]);

  return (
    <>
      {unmount && (
        <LoaderContainer
          fullScreen={fullScreen}
          background={background}
          className={`${!open ? "fade-out" : ""}`}
          onAnimationEnd={() => {
            setTimeout(() => {
              setUnmount(false);
            }, 200);
          }}
          {...rest}
        >
          <div>
            {siteConfigs?.profile_image ? (
              <Image
                loading="lazy"
                src={siteConfigs?.profile_image}
                width={"400"}
                height={"200"}
                style={{ objectFit: "contain" }}
              />
            ) : null}
          </div>
        </LoaderContainer>
      )}
    </>
  );
}
