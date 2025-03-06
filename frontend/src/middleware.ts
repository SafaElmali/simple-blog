import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UrlUtil } from "@/lib/urls";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthPage =
    pathname === UrlUtil.buildAdminLoginPath() ||
    pathname === UrlUtil.buildAdminRegisterPath();

  // Only check authentication for admin routes
  if (isAdminRoute) {
    // Allow access to auth pages without token
    if (isAuthPage) {
      // Redirect to dashboard if already authenticated
      if (token) {
        return NextResponse.redirect(
          new URL(UrlUtil.buildAdminDashboardPath(), request.url)
        );
      }
      return NextResponse.next();
    }

    // Require authentication for all other admin routes
    if (!token) {
      return NextResponse.redirect(
        new URL(UrlUtil.buildAdminLoginPath(), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
