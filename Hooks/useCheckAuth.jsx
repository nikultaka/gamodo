import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { setUserProfile } from "@/reduxtoolkit/profile.slice";

export function useCheckAuth() {
  const dispatch = useDispatch();
  const hasToken = getCookie(process.env.NEXT_APP_TOKEN_NAME);

  useEffect(() => {
    const _val = hasToken?.length;
    //need to call and check profile data and set it
    dispatch(
      setUserProfile({
        _id: _val,
      })
    );
    return () => {
      dispatch(
        setUserProfile({
          _id: _val,
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken]);

  return hasToken;
}
