import React, { useCallback, useEffect, useMemo, useState } from "react";
import IconCheckbox from "@/components/IconCheckbox/IconCheckbox";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "@/styles/pages/selectproductcategory.module.scss";
import assest from "@/json/assest";
import Image from "next/image";
import { Fade } from "@mui/material";
import { Cookies } from "react-cookie";
import { useRouter } from "next/navigation";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";

const cookie = new Cookies();
function SelectProductCategories({ onNext, index }) {
  const router = useRouter();

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
        image: "/assets/images/milk.png",
        name: "Milk",
      },
      {
        id: 2,
        image: "/assets/images/coffee.png",
        name: "Coffee",
      },
      {
        id: 3,
        image: "/assets/images/shampoo.png",
        name: "Shampoo",
      },
      {
        id: 4,
        image: "/assets/images/bread.png",
        name: "Bread",
      },
      {
        id: 5,
        image: "/assets/images/juice.png",
        name: "Juice",
      },
      {
        id: 6,
        image: "/assets/images/butter.png",
        name: "Butter",
      },
      {
        id: 7,
        image: "/assets/images/candy.png",
        name: "Candy",
      },
      {
        id: 8,
        image: "/assets/images/chips.png",
        name: "Chips",
      },
      {
        id: 9,
        image: "/assets/images/icecream.png",
        name: "Ice cream",
      },
      {
        id: 1,
        image: "/assets/images/milk.png",
        name: "Milk",
      },
      {
        id: 2,
        image: "/assets/images/coffee.png",
        name: "Coffee",
      },
      {
        id: 3,
        image: "/assets/images/shampoo.png",
        name: "Shampoo",
      },
      {
        id: 4,
        image: "/assets/images/bread.png",
        name: "Bread",
      },
      {
        id: 5,
        image: "/assets/images/juice.png",
        name: "Juice",
      },
      {
        id: 6,
        image: "/assets/images/butter.png",
        name: "Butter",
      },
      {
        id: 7,
        image: "/assets/images/candy.png",
        name: "Candy",
      },
      {
        id: 8,
        image: "/assets/images/chips.png",
        name: "Chips",
      },
      {
        id: 9,
        image: "/assets/images/icecream.png",
        name: "Ice cream",
      },
    ];
  }, []);
  return (
    <div className="scrollSec">
      <div className={styles.selectStorePage}>
        <figure className={styles.rewardsLogo}>
          <Image
            loading="lazy"
            src={assest.category}
            alt="rewards"
            height={130}
            width={162}
          />
          <p>
            Select your favorite Product category and we will deliver relevent
            deals and coupons
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

export default SelectProductCategories;
