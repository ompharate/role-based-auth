import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/login"];

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  if (token) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};