import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages qui nécessitent d'être connecté
const protectedRoutes = ["/choix", "/dashboard", "/admin"];

// Pages réservées aux admins
const adminRoutes = ["/admin"];

// Pages publiques 
const authRoutes = ["/connexion", "/inscription"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;

  let userRole: string | null = null;
  if (userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      userRole = user?.role ?? null;
    } catch {
      userRole = null;
    }
  }

  // Redirige vers /connexion si page protégée et non connecté
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }

  // Redirige vers /choix si page admin et pas admin
  const isAdmin = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdmin && userRole !== "admin") {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }

  // Redirige si déjà connecté et tente d'accéder à connexion/inscription
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && token) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/choix", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/connexion",
    "/inscription",
    "/choix",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};