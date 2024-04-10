import NextAuth from "next-auth";
import authConfig from "./auth.config";
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  PublicRoutes,
  authRoutesLocale,
  publicRoutesLocale,
} from "@/route";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'hi'],

  // Used when no locale matches
  defaultLocale: 'en'

})
const validateUrl = (req: any) => {
  const { nextUrl } = req;
  const { cookies } = req;
  console.log(cookies);
  const locale = cookies.get("NEXT_LOCALE")?.value || "en"
  const isUrlWithLocalPath = nextUrl.pathname.startsWith(`/${locale}`)
  if (!isUrlWithLocalPath) {
    return Response.redirect(new URL(`/${locale}/${nextUrl.pathname}`, nextUrl));
  }
  return
}
const authMiddleware = auth((req) => {
  const { nextUrl } = req;
  const { cookies } = req;
  const locale = cookies.get("NEXT_LOCALE")?.value || "en"
  const isLogging = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = nextUrl.pathname == "" || publicRoutesLocale.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutesLocale.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return
  }
  if (isAuthRoutes) {
    if (isLogging) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return intlMiddleware(req);
  }
  if (!isLogging && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const resp = NextResponse.redirect(new URL(`/${locale}/auth/login`, nextUrl));
    resp.cookies.set("callback-url", nextUrl.toString());
    return resp;
  }
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", '/(en|hi|fr)/:path*'],
};
export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isPublicPage = PublicRoutes.includes(nextUrl.pathname);
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
