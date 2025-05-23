import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico).*)",
  ],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("Incoming pathname:", pathname);

  // Handle root path ("/")
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    const territory = "test";
    const locale = "something";
    
    // Set browser's visible URL to `/test/something`
    url.pathname = `/${territory}/${locale}`;
    
    // Internally rewrite to `/test/something/home`
    console.log(`Rewriting / to /${territory}/${locale}/home`);
    return NextResponse.rewrite(new URL(`/${territory}/${locale}/home`, request.url));
  }

  return NextResponse.next();
}