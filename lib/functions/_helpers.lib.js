import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";
import cookie from "cookie";
import { decompressFromEncodedURIComponent } from "lz-string";
/**
 * Check if the window object exists.
 * @returns A function that checks if the window is undefined.
 */
if (typeof window !== "undefined") {
  var txt = "";
  txt = "Browser CodeName: " + navigator.appCodeName + "\n";
  txt += "Browser Name: " + navigator.appName + "\n";
  txt += "Browser Version: " + navigator.appVersion + "\n";
  txt += "Cookies Enabled: " + navigator.cookieEnable + "\n";
  txt += "Browsr Language: " + navigator.language + "\n";
  txt += "Browser Online: " + navigator.onLine + "\n";
  txt += "Platform: " + navigator.platform + "\n";
  txt += "User-agent header: " + navigator.userAgent + "\n";
  txt += "User-agent language: " + navigator.systemLanguage + "\n";
  console.log(txt);
}

export function checkWindow() {
  return typeof window !== "undefined";
}

export function isInServer() {
  return typeof document === "undefined";
}

// Detects if device is in standalone mode
export const isInStandaloneMode = () => {
  if (typeof navigator === undefined) {
    return false;
  }
  return "standalone" in navigator && navigator.standalone;
};
export function isAppleDevice() {
  if (typeof navigator === undefined) {
    return false;
  }
  const platformExpression = /Mac|iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;
  return platformExpression.test(agent);
}
export function isIosDevice() {
  if (typeof navigator === undefined) {
    return false;
  }
  const platformExpression = /iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;
  return platformExpression.test(agent);
}

export function isAppleSafari() {
  if (typeof navigator === undefined) {
    return false;
  }
  const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  const expectedExpression = /Safari/i;

  const agent = navigator.userAgent;
  if (rejectedExpression.test(agent)) {
    return false;
  }
  return isAppleDevice() && expectedExpression.test(agent);
}

export const matchMobileUserAgent = (userAgent) => {
  if (!userAgent) {
    return null;
  }
  return userAgent?.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );
};

export function parseCookies(req) {
  return cookie.parse(
    req
      ? req.headers.cookie || ""
      : typeof document !== "undefined"
      ? document?.cookie
      : ""
  );
}

export const decryptSliceEncryption = (cookieValue) => {
  const decryption = !cookieValue.startsWith("%20")
    ? decompressFromEncodedURIComponent
    : decodeURIComponent;
  let decryptedString = decryption(cookieValue);
  if (decryptedString) {
    const config = JSON.parse(decryptedString);
    return config;
  }
  return null;
};

export const getDecryptedCookieValue = (cookieName, req) => {
  const value = parseCookies(req)?.[cookieName];
  if (value) {
    return decryptSliceEncryption(value);
  }
  return null;
};

export const throttledTriggerLogoutEvent = () => {
  eventEmitter.emit(events.auth.logout);
};
