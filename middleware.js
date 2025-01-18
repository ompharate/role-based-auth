import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/login"];
const adminRoutes = ["/admin"];
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });
//   console.log("line 16", token);
  if (token) {
    if (token.role == "user" && adminRoutes.includes(pathname)) {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    }
    return NextResponse.next();
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
