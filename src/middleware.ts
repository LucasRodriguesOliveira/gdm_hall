import { NextRequest, NextResponse } from 'next/server';
import { USER_AUTH_TOKEN } from './constants/cookies.token';

export function middleware(request: NextRequest) {
  const tokenExists = !!request.cookies.get(USER_AUTH_TOKEN.description!);
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const isRegisterPage = request.nextUrl.pathname.startsWith('/register');

  if (!tokenExists && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (tokenExists && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register'],
};
