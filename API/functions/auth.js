import axiosInstance from "../../Axios/axiosInstance";
import { auth_end_point } from "../Endpoints/apiEndPoints";

export function LoginUser(payload) {
  const _res = axiosInstance
    .post(auth_end_point.login, { data: payload })
    .then((response) => response)
    .catch((error) => error);

  return _res;
}
export function postForgetPassword(payload) {
  const _res = axiosInstance
    .post(auth_end_point.forgetPassword, { data: payload })
    .then((response) => response)
    .catch((error) => error);
  return _res;
}

export const highlightTitle = (content, text) => {
 
  try {
    let hightlight_regex = content;

    if (content?.length) {
      hightlight_regex = content.replaceAll(text, `<mark>${text}</mark>`);
    }
    return hightlight_regex;
  } catch {
    return content;
  }
};
