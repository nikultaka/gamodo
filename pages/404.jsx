import Link from "next/link";
import React from "react";
import styles from "@/styles/pages/404.module.scss";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import assest from "@/json/assest";
import Image from "next/image";
import { Box } from "@mui/material";

const Index = () => (
  <Box
    className={styles.pageerror}
    sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      textAlign: "center",
    }}
  >
    {/* <BackButton /> */}
    <Box className={styles.inner}>
      <Image
        loading="lazy"
        src={assest.Error}
        alt="menu1"
        height={195}
        width={302}
      />
    </Box>
    <Box
      className={styles.back}
      sx={{
        marginTop: "48px",
      }}
    >
      <Link href="/home">Go Back</Link>
    </Box>
  </Box>
);

export default Index;
