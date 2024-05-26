import { NextRequest, NextResponse } from 'next/server'

export const publicRoutes = [
  '/',
  '/kontakts',
  '/login',
  '/signup',
  '/QR'
]

export const adminRoutes = [
  '/admin',
]

export async function middleware(request) {
    const { pathname } = request.nextUrl
    const userId = request.cookies.get('gym_user_id')?.value
    const role = request.cookies.get('gym_role')?.value
    const is_locked = request.cookies.get('gym_is_locked')?.value === 'true';

    if(is_locked && pathname !== '/banned') {
      return NextResponse.redirect(new URL('/banned', request.url))
    }

    if (!userId && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (userId && publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    if (role === 'user' && adminRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: [
        // Match all routes except the ones that start with /auth/login and api and the static folder
        '/((?!api|_next/static|_next/image|favicon.ico|auth/signIn).*)'
    ]
}
