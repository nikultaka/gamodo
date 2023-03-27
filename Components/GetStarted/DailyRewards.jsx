import React, { useCallback, useEffect } from "react";
import styles from "@/styles/pages/rewards.module.scss";
import Image from "next/image";
import CartIcon from "@/ui/icons/CartIcon";
import GiftIcon from "@/ui/icons/GiftIcon";
import GameIcon from "@/ui/icons/GameIcon";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";

const cookie = new Cookies();
function DailyRewards({ onNext, index }) {
  const router = useRouter();
  const { siteConfigs } = useSelector((state) => state?.gamodoConfig);

  const goToNext = useCallback(() => {
    onNext?.(index, index + 1);
  }, [index, onNext]);

  useEffect(() => {
    eventEmitter.on(events.stepper.forward, goToNext);
    return () => {
      eventEmitter.off(events.stepper.forward, goToNext);
    };
  }, [onNext]);

  useEffect(() => {
    cookie.set("isFirst", true, {
      path: "/",
      sameSite: true,
    });
  }, []);

  return (
    <div className={styles.rewardsPage}>
      <figure className={styles.rewardsLogo}>
        <Image
          loading="lazy"
          src={siteConfigs?.profile_image}
          alt="rewards"
          height={100}
          width={200}
          style={{
            objectFit: "contain",
          }}
        />
      </figure>
      <div className={styles.firstScreen}>
        <div className={styles.screenRow}>
          <CartIcon />
          <p>Daily coupons and huge discounts from your favorite store</p>
        </div>
        <div className={styles.screenRow}>
          <GiftIcon />
          <p>Monthly contests and gift card giveaways up to $1,000</p>
        </div>
        <div className={styles.screenRow}>
          <GameIcon />
          <p>Access to hundreds of games to play right from your phone</p>
        </div>
      </div>
    </div>
  );
}

export default DailyRewards;
