import assest from "@/json/assest";
import SingleHeader from "@/layout/Headers/SingleHeader";
import Wrapper from "@/layout/Wrappers/Wrapper";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { getHostName } from "@/lib/functions/_common.lib";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

export default function index() {
  const { availableThemes, currentTheme } = useGamodoTheme();
  const headerRef = useRef(null);
  return (
    <div>
      <Wrapper type={"audiobooks"}>
        <div
          className={`${
            currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
          }`}
        ></div>

        <div className="commonTopTitle" ref={headerRef}>
          <h3>Audio files</h3>
        </div>
        <BackButton />
        {/* <SingleHeader type={"audiobooks"} /> */}
        <div className="pagebody">
          <div className="couponSlider">
            <div className="secHeading">
              <h3>Audio Files</h3>
              {/* <Link href="">View more</Link> */}
            </div>
            <div className="fileListWrapper">
              <div className="fileItems">
                <div className="audioplayBtn">
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
                <div className="audioPlayBox">
                  <div className="filesLeft">
                    <figure>
                      <Image
                        loading="lazy"
                        src={assest.audio01}
                        alt="Pause"
                        height={52}
                        width={54}
                      />
                    </figure>
                    <div className="filesName">
                      <h4>Audio Files</h4>
                      <p>Artist Name</p>
                    </div>
                  </div>
                  <div className="filesRight">2:52</div>
                </div>
              </div>
              <div className="fileItems">
                <div className="audioplayBtn">
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
                <div className="audioPlayBox">
                  <div className="filesLeft">
                    <figure>
                      <Image
                        loading="lazy"
                        src={assest.audio02}
                        alt="Pause"
                        height={52}
                        width={54}
                      />
                    </figure>
                    <div className="filesName">
                      <h4>Audio Files</h4>
                      <p>Artist Name</p>
                    </div>
                  </div>
                  <div className="filesRight">2:52</div>
                </div>
              </div>
              <div className="fileItems">
                <div className="audioplayBtn">
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
                <div className="audioPlayBox">
                  <div className="filesLeft">
                    <figure>
                      <Image
                        loading="lazy"
                        src={assest.audio03}
                        alt="Pause"
                        height={52}
                        width={54}
                      />
                    </figure>
                    <div className="filesName">
                      <h4>Audio Files</h4>
                      <p>Artist Name</p>
                    </div>
                  </div>
                  <div className="filesRight">2:52</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
