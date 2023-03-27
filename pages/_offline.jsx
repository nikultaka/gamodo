import React from "react";
import offlineJson from "@/json/lottie/offline.json";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import Lottie from "lottie-react";
import Wrapper from "@/layout/Wrappers/Wrapper";
import { Container, Stack, Button } from "@mui/material";

const OfflinePage = () => {
  const handleRetry = () => {
    if (checkWindow()) {
      window.location.reload();
    }
  };

  return (
    <Wrapper>
      <Container sx={{ padding: 5 }}>
        <Lottie
          animationData={offlineJson}
          loop
          style={{
            height: 300,
            width: 300,
          }}
        />
        <Stack direction="row" justifyContent="center">
          <h1>You are offline!</h1>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            onClick={handleRetry}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Retry
          </Button>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default OfflinePage;
