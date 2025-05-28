import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
       customer's matcher
       */
    "/((?!api/|_next/|_vercel/|fonts/|examples/|legal/|icons/|.well-known/|favicon.ico|.*\\..*).*)",
  ],
};

export function middleware(request) {
  console.log("Middleware processing:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    const territory = "test";
    const locale = "something";

    url.pathname = `/${territory}/${locale}`;

    console.log(`Redirecting / to /${territory}/${locale}/home `);
    return NextResponse.redirect(
      new URL(`/${territory}/${locale}/home`, request.url)
    );
  }

  return NextResponse.next();
}
