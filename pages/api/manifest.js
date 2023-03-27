import { setAxiosBaseUrl } from "@/axios/authAxiosInstance";
import { getHostName } from "@/lib/functions/_common.lib";
import { getDecryptedCookieValue } from "@/lib/functions/_helpers.lib";
import { fetchMasterSettings } from "@/reduxtoolkit/gamodoConfig.slice";

export default async function handler(req, res) {
  //needed for every request
  const hostname = getHostName(req?.headers?.host);
  let siteConfigs = getDecryptedCookieValue("gamodo", req)?.siteConfigs;
  setAxiosBaseUrl(hostname, "api");
  if (!siteConfigs) {
    try {
      siteConfigs = await fetchMasterSettings().then(
        (response) => response.result.data
      );
    } catch (e) {
      siteConfigs = {};
      
    }
  }

  const proto =
    req.headers["x-forwarded-proto"] || req.connection.encrypted
      ? "https"
      : "http";

  const origin = proto + "://" + req.headers.host;
  const appName = siteConfigs?.site_name || "";
  const appLogo = siteConfigs?.pwa_image;
  const maskableLogo = siteConfigs?.pwa_image;
  let manifest = {
    theme_color: "#000000",
    background_color: "#ffffff",
    display: "standalone",
    id: origin,
    scope: origin,
    start_url: origin,
    name: appName,
    short_name: appName.split(" ")?.[0],
    // description: "This app is to demo PWA in Next.js",
    icons: [
      {
        src: maskableLogo,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    protocol_handlers: [
      {
        protocol: "web+gamodo",
        url: origin + "?type=%s",
      },
    ],
  };
  return res.status(200).json(manifest);
}
