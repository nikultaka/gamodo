import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsOnline } from "@/reduxtoolkit/global.slice";
import { checkWindow } from "@/lib/functions/_helpers.lib";

const navigator = checkWindow() && window?.navigator;
export function useIsOnline() {
  const [status, setStatus] = useState(navigator?.onLine);
  const dispatch = useDispatch();
  const handleChange = () => {
    setStatus(navigator?.onLine);
    dispatch(setIsOnline(navigator?.onLine));
  };

  useEffect(() => {
    if (navigator) {
      window.addEventListener("online", handleChange);
      window.addEventListener("offline", handleChange);
    }

    return () => {
      if (navigator) {
        window.removeEventListener("online", handleChange);
        window.removeEventListener("offline", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return status;
}
