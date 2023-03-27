import React, { useCallback, useEffect, useMemo, useState } from "react";
import IconCheckbox from "@/components/IconCheckbox/IconCheckbox";
import { Box, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "@/styles/pages/selectstore.module.scss";
import assest from "@/json/assest";
import Image from "next/image";
import { Fade } from "@mui/material";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";

function SelectStores({ onNext, index }) {
  const [selected, setSelected] = useState([]);
  const onSelect = useCallback(
    (index) => {
      let tempSelected = [...selected];
      const foundIt = tempSelected.indexOf(index);
      if (foundIt > -1) {
        tempSelected.splice(foundIt, 1);
      } else {
        tempSelected.push(index);
      }
      setSelected(tempSelected);
    },
    [selected]
  );

  const goToNext = useCallback(() => {
    onNext?.(index, index + 1);
  }, [index, onNext]);

  useEffect(() => {
    eventEmitter.on(events.stepper.forward, goToNext);
    return () => {
      eventEmitter.off(events.stepper.forward, goToNext);
    };
  }, [onNext]);

  const stores = useMemo(() => {
    return [
      {
        id: 1,
        image: "/assets/images/walmart.png",
        name: "Wallmart",
      },
      {
        id: 2,
        image: "/assets/images/amazon.png",
        name: "Amazon",
      },
      {
        id: 3,
        image: "/assets/images/ebay.png",
        name: "Ebay",
      },
      {
        id: 4,
        image: "/assets/images/aldi.png",
        name: "Aldi",
      },
      {
        id: 5,
        image: "/assets/images/b&b.png",
        name: "B&B Works",
      },
      {
        id: 6,
        image: "/assets/images/bestbuy.png",
        name: "Best Buy",
      },
      {
        id: 7,
        image: "/assets/images/costco.png",
        name: "Costco",
      },
      {
        id: 8,
        image: "/assets/images/cvs.png",
        name: "Netflix",
      },
      {
        id: 1,
        image: "/assets/images/walmart.png",
        name: "Wallmart",
      },
      {
        id: 2,
        image: "/assets/images/amazon.png",
        name: "Amazon",
      },
      {
        id: 3,
        image: "/assets/images/ebay.png",
        name: "Ebay",
      },
      {
        id: 4,
        image: "/assets/images/aldi.png",
        name: "Aldi",
      },
      {
        id: 5,
        image: "/assets/images/b&b.png",
        name: "B&B Works",
      },
      {
        id: 6,
        image: "/assets/images/bestbuy.png",
        name: "Best Buy",
      },
      {
        id: 7,
        image: "/assets/images/costco.png",
        name: "Costco",
      },
      {
        id: 8,
        image: "/assets/images/cvs.png",
        name: "Netflix",
      },
    ];
  }, []);

  return (
    <div className="scrollSec">
      <div className={styles.selectStorePage}>
        <figure className={styles.rewardsLogo}>
          <Image
            loading="lazy"
            src={assest.store}
            alt="rewards"
            height={130}
            width={162}
          />
          <p>
            Select your favorite stores and we will deliver relevent deals and
            coupons
          </p>
        </figure>
        <div className={styles.selectStoreGrid}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {stores.map((item, index) => (
                <Grid item xs={4} key={index}>
                  <IconCheckbox
                    key={index}
                    id={index}
                    item={item}
                    selected={selected?.includes(index)}
                    onSelect={onSelect}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SelectStores;
