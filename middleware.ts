import NextAuth from 'next-auth'
const { auth } = NextAuth(authConfig)
import {
	DEFAULT_LOGIN_REDIRECT,
	API_AUTH_PREFIX,
	AUTH_ROUTES,
	PUBLIC_ROUTES,
} from './features/auth/config/routes'
import { NextResponse } from 'next/server'
import authConfig from './features/auth/config/auth.config'
export default auth(req => {
	const { nextUrl, auth } = req
	const isLoggedIn = !!auth

	const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
	const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)
	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

	if (isApiAuthRoute) {
		return
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return
	}

	if (!isPublicRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL('/auth/login', nextUrl))
	}
	return
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
