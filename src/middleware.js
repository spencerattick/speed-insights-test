import { NextResponse } from "next/server";

export const config = {
    matcher: [
      /*
       customer's matcher
       */
      '/((?!api|_next|_vercel|fonts|examples|legal|icons|.well-known|[\\w-]+\\.\\w+).*)',
    ],
  };
  
export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("Incoming pathname: ", pathname);

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    const territory = "test";
    const locale = "something";
    
    url.pathname = `/${territory}/${locale}`;
    
    console.log(`Rewriting / to /${territory}/${locale}/home `);
    return NextResponse.redirect(new URL(`/${territory}/${locale}/home`, request.url));
  }

  return NextResponse.next();
}