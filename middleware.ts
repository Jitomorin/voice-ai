import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken")?.value;
  let userLoggedIn = accessToken ? true : false;

  // if (!userLoggedIn) {
  //     return NextResponse.redirect("/sign-in");
  // }
  if (request.nextUrl.pathname.match("/sign-in") && userLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.match("/sign-in") && !userLoggedIn) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.match("/sign-up") && userLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname.match("/sign-up") && !userLoggedIn) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.match("/chat") && userLoggedIn) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.match("/chat") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.match("/admin") && userLoggedIn) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.match("/admin") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.match("/dashboard") && userLoggedIn) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.match("/dashboard") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.match("/dashboard/users") && userLoggedIn) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.match("/dashboard/users") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    //   "/search",
    //   "/forgot-password",
    //   "/forgot-password-reset",
    "/chat/:path*",
    //   "/profile/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
