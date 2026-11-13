import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ar", "en"];

// Arabic is the default; English only when the browser asks for it first.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const preferred = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  const locale = preferred.startsWith("en") ? "en" : "ar";
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = { matcher: ["/((?!_next|media|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"] };
