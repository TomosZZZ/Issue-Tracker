import NextAuth from 'next-auth'
const { auth } = NextAuth(authConfig)
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from './features/auth/config/routes'
import { NextResponse } from 'next/server'
import authConfig from './features/auth/config/auth.config'
export default auth(req => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

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
