import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLE_ROUTES = {
  admin: "/admin/homepage",
  trainer: "/trainer/dashboard",
  user: "/user/dashboard",
};

const ROLE_PATH_PREFIXES = {
  admin: "/admin",
  trainer: "/trainer",
  user: "/user",
};

function getRoleFromPath(pathname: string): string | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/trainer")) return "trainer";
  if (pathname.startsWith("/user")) return "user";
  return null;
}

function getExpectedPathForRole(role: string): string {
  return ROLE_ROUTES[role] || "/user/dashboard";
}

function isPathAllowedForRole(pathname: string, role: string): boolean {
  const prefix = ROLE_PATH_PREFIXES[role];
  return pathname.startsWith(prefix);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const publicPaths = ["/auth/login", "/auth/register", "/", "/find-trainer", "/articles", "/workshops", "/trainer-profile", "/join-as-trainer", "/about", "/contact", "/privacy", "/terms", "/Industry", "/department", "/competency"];

  const isPublicPath = publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isPublicPath) {
    if (token && pathname.startsWith("/auth/")) {
      const role = request.cookies.get("role")?.value || "user";
      const targetPath = getExpectedPathForRole(role);
      return NextResponse.redirect(new URL(targetPath, request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = request.cookies.get("role")?.value;
  if (!role) {
    return NextResponse.next();
  }

  const requiredRole = getRoleFromPath(pathname);
  if (requiredRole && role !== requiredRole) {
    const correctPath = getExpectedPathForRole(role);
    if (pathname !== correctPath) {
      return NextResponse.redirect(new URL(correctPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};