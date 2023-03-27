import { getLoginApiUrl } from "@/api/Endpoints/apiEndPoints";
import { getHostName } from "@/lib/functions/_common.lib";

export default async function handler(req, res) {
  return res.status(200).send(JSON.stringify(req.headers));
  const hostname = getHostName(req.headers.host);
  return res.status(200).send(getLoginApiUrl(hostname));
}
