import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  
  // Ensure any variation of "/infopack" redirects to lowercase "/infopack"
  if (url.pathname.toLowerCase() === "/infopack" && url.pathname !== "/infopack") {
    url.pathname = "/infopack";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to any URL that starts with "/infoPack" (case insensitive)
export const config = {
  matcher: ["/infopack", "/infopack/:path*", "/InfoPack", "/INFOpack", "/INFOPACK", "/infoPack"],
};