export const defaultHostName = "voxiproducts.com";
export const getHostName = (hostname) => {
  // hostname should be like this => 'members.voxiproducts.com
  if (
    process.env.NODE_ENV === "development" ||
    hostname?.includes("dedicateddevelopers.us")
  ) {
    return "gamodostaging.com";
  }
  let str =
    !hostname ||
    hostname === "undefined" ||
    typeof hostname === "undefined"
      ? null
      : hostname;

  if (str) {
    let splits = str.split(".");
    if (splits?.length) {
      if (splits?.[0] === "members") {
        splits.splice(0, 1);
        return splits.join("."); //hostname with domain extension, cause client might use dynamic extension in future
      }
    }
  }

  return null;
};
