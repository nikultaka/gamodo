import { NextResponse } from "next/server";
import { matchMobileUserAgent } from "./lib/functions/_helpers.lib";

// If the incoming request has the "token" cookie

export function middleware(request) {
  const has_token = request.cookies.get("token");

  if (
    has_token?.length === 0 ||
    has_token === undefined ||
    has_token === null
  ) {

    if (typeof window !== 'undefined' && !localStorage?.getItem("isExternalUser")) {
      request.nextUrl.pathname = "/login";
      return NextResponse.redirect(request.nextUrl);
    } else {
      return NextResponse.next();
    }
  } else {
    const userAgent = request?.headers?.get("user-agent");
    let userAgentMobileMatchResult = matchMobileUserAgent(userAgent);
    if (Boolean(userAgentMobileMatchResult)) {
      return NextResponse.next();
    } else {
      if (!request.nextUrl.pathname.startsWith("/home")) {
        request.nextUrl.pathname = "/home";
        return NextResponse.redirect(request.nextUrl);
      } else {
        return NextResponse.next();
      }
    }
  }
}

export const config = {
  matcher: [
    "/home",
    "/profile",
    "/change-password",
    "/allgames",
    "/allBlogs",
    "/allComingNextMonth",
    "/allEbooks",
    "/allstorelist",
    "/allTodaysDeal",
    "/amazondeals",
    "/blogsDetails",
    "/coupons",
    "/favourite-list",
    "/featuredgamesdetails",
    "/game",
    "/game-by-category",
    "/game-details/:path*",
    "/movie",
  ],
};
