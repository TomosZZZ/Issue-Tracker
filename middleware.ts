import NextAuth from 'next-auth'
import authConfig from './features/auth/config/auth.config'

const { auth } = NextAuth(authConfig)

import {
	publicRoutes,
	authRoutes,
	apiAuthPrefix,
	DEFAULT_LOGIN_REDIRECT,
} from './features/auth/config/routes'

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
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return
	}

	if (!isPublicRoute && !isLoggedIn) {
		return Response.redirect(new URL('/auth/login', nextUrl))
	}
	return
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
