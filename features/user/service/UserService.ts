import { LoginSchema } from '@/features/auth/schemas'
import { UserRepository } from './../repository/UserRepository'
import { RegisterSchema } from '@/features/auth/schemas/RegisterSchema'
import { signIn } from '@/features/auth/config/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/features/auth/config/routes'
import { AuthError } from 'next-auth'

export class UserService {
	async createUser({
		email,
		password,
		name,
	}: {
		email: string
		password: string
		name: string
	}) {
		const userRepository = new UserRepository()

		const validation = RegisterSchema.safeParse({ email, password, name })

		if (!validation.success) {
			const errorMsgs = validation.error.issues.map(issue => issue.message)

			return { error: errorMsgs.join(', ') }
		}

		const existingUser = await userRepository.getUserByEmail(email)

		if (existingUser) {
			return  { error: 'User already exists' }
		}

		await userRepository.createUser(email, password, name)

		return { success: 'User created' }
	}

	async login({ email, password }: { email: string; password: string }) {
		const fieldsValidated = LoginSchema.safeParse({ email, password })

		if (!fieldsValidated.success) {
			const errorMsgs = fieldsValidated.error.issues.map(issue => issue.message)

			return { error: errorMsgs.join(', ') }
		}

		const userRepository = new UserRepository()

		const user = await userRepository.getUserByEmail(email)

		if (!user || !user.email || !user.password) {
			return { error: 'User not found' }
		}

		const passwordIsValid = await userRepository.validatePassword(
			password,
			user.password
		)

		if (!passwordIsValid) {
			return { error: 'Password is invalid' }
		}

		try {
			await signIn('credentials', {
				email,
				password,
				redirectTo: DEFAULT_LOGIN_REDIRECT,
			})
			return { success: 'Logged in' }
		} catch (error) {
			if (error instanceof AuthError) {

				switch (error.type) {
					case 'CredentialsSignin':
						return { error: 'Invalid credentials' }
					default:
						return { error: 'Something went wrong' }
				}
			}
			throw error
		}
	}
}
