import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET || "supersecretkey123" 
  });

  
  if (request.nextUrl.pathname.startsWith('/feed')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  
  if (token && (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/registration')) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/registration', '/feed/:path*'],
};
