import { LoginSchema } from '@/features/auth/schemas'
import { RegisterSchema } from '@/features/auth/schemas/RegisterSchema'
import { signIn } from '@/features/auth/config/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/features/auth/config/routes'
import { AuthError } from 'next-auth'
import bcrypt from 'bcryptjs'
import { userRepository } from './../repository'
import { z } from 'zod'
import { EditPasswordSchema } from '../schemas'

export class UserService {
	private async validatePassword(password: string, hashedPassword: string) {
		return bcrypt.compare(password, hashedPassword)
	}

	async createUser({
		email,
		password,
		name,
	}: {
		email: string
		password: string
		name: string
	}) {
		const validation = RegisterSchema.safeParse({ email, password, name })

		if (!validation.success) {
			const errorMsgs = validation.error.issues.map(issue => issue.message)

			return { error: errorMsgs.join(', ') }
		}

		const existingUser = await userRepository.getUserByEmail(email)

		if (existingUser) {
			return { error: 'User already exists' }
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

		const user = await userRepository.getUserByEmail(email)

		if (!user || !user.email || !user.password) {
			return { error: 'User not found' }
		}

		const passwordIsValid = await this.validatePassword(password, user.password)

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

	async getUsers() {
		return await userRepository.getUsers()
	}
	async getUserById(id: string) {
		return await userRepository.getUserById(id)
	}
	async editUser(data: { name: string; image: string }, id: string) {
		return await userRepository.editUser(data, id)
	}

	async deleteFriend(userId: string, friendId: string) {
		return await userRepository.deleteFriend(userId, friendId)
	}
	async addFriend({ userId, friendId }: { userId: string; friendId: string }) {
		return await userRepository.addFriend(userId, friendId)
	}

	async changePassword(
		data: z.infer<typeof EditPasswordSchema> & { id: string }
	) {
		return await userRepository.changePassword(data)
	}
}

export const userService = new UserService()
