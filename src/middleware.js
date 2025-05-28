import { NextResponse } from "next/server";

export const config = {
    matcher: [
      /*
       * Match all paths except for:
       * 1. /api routes
       * 2. /_next (Next.js internals)
       * 3. /fonts (inside /public)
       * 4. /examples (inside /public)
       * 5. all root files inside /public (e.g. /favicon.ico)
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
    
    console.log(`Rewriting / to /${territory}/${locale}/home`);
    return NextResponse.rewrite(new URL(`/${territory}/${locale}/home`, request.url));
  }

  return NextResponse.next();
}