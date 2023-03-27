import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import styles from "@/styles/components/watchtrailers.module.scss";
import { useRouter } from "next/router";
import { useCallback } from "react";
import moment from "moment";

function WatchTrailers() {
  const router = useRouter();
  const routeToTrailerDetails = useCallback(() => {
    router.push("/movie-trailer");
  }, []);
  return (
    <div className={styles.trailerItem + " itemsWrapper"}>
      <div className="productCard">
        <div className="videoGame">
          <video
            controls
            controlsList="nodownload"
            width="100%"
            height="100%"
            playing={true}
            muted={true}
            loop={true}
            src="/assets/images/pukk.mp4"
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item sm={8} xs={8}>
              <div className="cardDetails">
                <h4>Avatar: The Way of Water</h4>
                <p>{moment("12-16-2022").format("DD MMM,YYYY")}</p>
              </div>
            </Grid>
            <Grid item sm={4} xs={4}>
              <div className="playnowBtnCustom">
                <MyButton>Play Now</MyButton>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default WatchTrailers;
