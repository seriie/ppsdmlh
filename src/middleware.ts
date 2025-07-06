import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  if (!isLoggedIn && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isLoggedIn && ["/auth/login", "/auth/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api/auth).*)",
  ],
};