import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const protectPages = ["/profile"];
const protectAdmin = ["/blog/create"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = request.nextUrl.pathname;

  if (protectPages.some((route) => url.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (protectAdmin.some((route) => url.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (protectAdmin.some((route) => url.startsWith(route)) && token) {
    const user: { role: "Admin" | "User" } = jwtDecode(token?.value);
    if (user.role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
