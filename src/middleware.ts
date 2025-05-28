import { NextResponse, type NextRequest } from "next/server";

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
    "/((?!api|_next|_vercel|fonts|examples|legal|icons|.well-known|[\\w-]+\\.\\w+).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const [territoryPath, localePath, pagePath] = pathname.split("/").slice(1);

  // Note: when we visit the root, always redirect to default territory + default locale
  if (!territoryPath) {
    return NextResponse.redirect(new URL(`/test/test`, req.url));
  }

  let response = NextResponse.next();

  if (!pagePath) {
    const url = req.nextUrl.clone();
    url.pathname = `/test/test/home`;
    response = NextResponse.rewrite(url);
  }

  return response;
}
