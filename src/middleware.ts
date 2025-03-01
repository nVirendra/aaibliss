// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './app/utils/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // Get JWT token from cookies
  const { pathname } = request.nextUrl;

  // Define protected routes for each role
  const protectedRoutes = {
    superadmin: /^\/superadmin(\/.*)?$/,
    admin: /^\/admin(\/.*)?$/,
    user: /^\/user(\/.*)?$/,
  };

  // Redirect to login if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the JWT token
    const decoded = await verifyToken(token);

    // Check if the user has access to the requested route
    if (
      pathname.match(protectedRoutes.superadmin) &&
      decoded.role !== 'superadmin'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.match(protectedRoutes.admin) && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.match(protectedRoutes.user) && decoded.role !== 'user') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Allow access to the requested route
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Define the routes to apply the middleware
export const config = {
  // matcher: ['/superadmin/:path*', '/admin/:path*', '/user/:path*'],
  matcher: ['/'],
};
