import NextAuth from "next-auth";
import authConfig from "./auth.config";
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    PublicRoutes,
    adminRoutes,
} from "@/route";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'id'],

    // Used when no locale matches
    defaultLocale: 'en'

})

const authMiddleware = auth((req) => {
    const { nextUrl } = req;
    const isLogging = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    if (isApiAuthRoute) {
        return;
    }
    if (isAuthRoutes) {
        if (isLogging) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }
    if (!isLogging && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const resp = NextResponse.redirect(new URL("/auth/login", nextUrl));
        resp.cookies.set("callback-url", nextUrl.toString());
        return resp;
    }
    return;
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", '/(en|id|fr)/:path*'],
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
