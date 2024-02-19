import bcrypt from 'bcryptjs'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '../schemas'
import { UserRepository } from '@/features/user/repository/UserRepository'

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials)
				const userRepository = new UserRepository()
				if (validatedFields.success) {
					const { email, password } = validatedFields.data

					const user = await userRepository.getUserByEmail(email)

					if (!user || !user.password) return null

					const passwordsMatch = await bcrypt.compare(password, user.password)
					if (passwordsMatch) {
						console.log(user)
						return user
					}
				}

				return null
			},
		}),
	],
} satisfies NextAuthConfig
