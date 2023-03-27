import axiosInstance from "@/axios/authAxiosInstance";
import { updateUserProfileData } from "@/reduxtoolkit/profile.slice";
import { wrapper } from "@/reduxtoolkit/store";
import { useRouter } from "next/router";
import React from "react";

export default function TokenLogin() {
  const router = useRouter();
  return <div>{router.query?.token}</div>;
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookieToken = context?.req?.cookies?.["token"];
    if (cookieToken) {
      return {
        redirect: {
          permanent: false,
          destination: "/home",
        },
      };
    }
    const token = context?.query?.token;
    try {
      const response = await axiosInstance.post(
        "getEditProfileData",
        { source: "external" },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status?.error_code === 0) {
        context?.res?.setHeader("set-cookie", [`token=${token};path=/`]);
        store.dispatch(updateUserProfileData(response?.result?.data));
      }
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    } catch (e) {
      console.log("error in token", e);
    }
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
);
