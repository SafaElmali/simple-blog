import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UrlUtil } from "@/lib/urls";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isAuthPage = request.nextUrl.pathname === UrlUtil.buildAdminLoginPath();

  if (!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL(UrlUtil.buildAdminLoginPath(), request.url)
    );
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL(UrlUtil.buildAdminDashboardPath(), request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
