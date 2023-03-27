import React from "react";
import { SnackbarProvider } from "notistack";

const ToastifyProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToastifyProvider;
