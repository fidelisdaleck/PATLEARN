import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/connexion", "/inscription", "/login", "/register", "/", "/about", "/fonctionalites", "/langues", "/choix", "/admin", "/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|gif|woff|woff2|ttf)$/)) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const response = NextResponse.next();

  if (isPublic) {
    return response;
  }

  const token = request.cookies.get("laravel_session") || request.cookies.get("XSRF-TOKEN");

  if (!token) {
    const loginUrl = new URL("/connexion", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|public|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.ico|.*\\.gif).*)",
  ],
};
