import { useState, useEffect, useCallback } from "react";
import offlineJson from "@/json/lottie/offline.json";
import { useIsOnline } from "@/hooks/useIsOnline";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import { Button, Dialog, DialogContent, Stack } from "@mui/material";
import Lottie from "lottie-react";

export default function OfflineModal() {
  const [open, setOpen] = useState(false);
  const isOnline = useIsOnline();
  useEffect(() => {
    setOpen(!isOnline);
  }, [isOnline]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleRetry = useCallback(() => {
    if (checkWindow()) {
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent dividers>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
