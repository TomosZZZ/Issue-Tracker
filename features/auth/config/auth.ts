import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		async session({ session, token }) {
			if (token?.sub && session.user) {
				session.user.id = token.sub
			}

			return session
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
