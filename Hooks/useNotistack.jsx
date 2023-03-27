import { useSnackbar } from "notistack";

const useNotiStack = () => {
  const { enqueueSnackbar } = useSnackbar();
  const autoHideDuration = 1000;

  const toastSuccess = (msg) => {
    enqueueSnackbar(msg, {
      variant: "success",
      autoHideDuration,
    });
  };

  const toastWarning = (msg) => {
    enqueueSnackbar(msg, {
      variant: "warning",
      autoHideDuration,
    });
  };

  const toastInfo = (msg) => {
    enqueueSnackbar(msg, {
      variant: "info",
      autoHideDuration,
    });
  };

  const toastError = (msg) => {
    enqueueSnackbar(msg, {
      variant: "error",
      autoHideDuration,
    });
  };

  return { toastSuccess, toastWarning, toastInfo, toastError };
};

export default useNotiStack;
