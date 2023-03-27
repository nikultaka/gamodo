import React, { useEffect } from "react";
import Seo from "./Seo";
import { useDispatch, useSelector } from "react-redux";
import { fetchMasterSettingsThunk } from "@/reduxtoolkit/gamodoConfig.slice";

export default function WithSiteConfigsSeo({ isUserAgentMobile }) {
  const { siteConfigs } = useSelector((state) => state?.gamodoConfig);
  const dispatch = useDispatch();
  useEffect(() => {
    //update on client side
    dispatch(fetchMasterSettingsThunk());
  }, []);

  return (
    <Seo
      title={siteConfigs?.site_name}
      description={""}
      url="/"
      image={siteConfigs?.profile_image}
      favicon={siteConfigs?.profile_image}
      manifestUrl={isUserAgentMobile ? "/api/manifest" : undefined}
    />
  );
}
