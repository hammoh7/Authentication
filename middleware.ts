import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  Default_Login_Redirect,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute) {
    return null;
  }
  if(isAuthRoute) {
    if(isLoggedIn) {
      return Response.redirect(new URL(Default_Login_Redirect, nextUrl));
    }
    return null;
  }
  if(!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/Login", nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
