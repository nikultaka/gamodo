import { Box } from "@mui/material";
import React from "react";
import assest from "@/json/assest";
import Image from "next/image";
import styles from "@/styles/pages/sitemaintenance.module.scss";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  //   let hostname = getHostName(ctx.req.headers.host);
  //   ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

const index = () => {
  return (
    <Box
      className={styles.pagemaintenance}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <BackButton />
      <Box className={styles.inner}>
        <Image
          loading="lazy"
          src={assest.Maintenance}
          alt="menu1"
          height={261}
          width={317}
        />
      </Box>
      <Box
        className={styles.back}
        sx={{
          marginTop: "34px",
        }}
      >
        <p>
          {" "}
          This site is down for scheduled maintenance. You will be notified when
          it is available.
        </p>
      </Box>
    </Box>
  );
};

export default index;
