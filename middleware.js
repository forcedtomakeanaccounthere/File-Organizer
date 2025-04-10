// middleware.js
"use server";
import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request) {
  const token = request.cookies.get("usertoken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = await verifyAuth(token);

    const pathname = request.nextUrl.pathname;
    if (
      pathname.startsWith("/dashboard") &&
      !pathname.startsWith("/documents/id") &&
      !user
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/protected/:path*"],
};
