import { UserRepository } from './../repository/UserRepository'
import { RegisterSchema } from '@/features/auth/schemas/RegisterSchema'

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

			return { response: { error: errorMsgs.join(', ') }, status: 400 }
		}

		const existingUser = await userRepository.getUserByEmail(email)

		if (existingUser) {
			return { response: { error: 'User already exists' }, status: 400 }
		}

		await userRepository.createUser(email, password, name)

		return { response: { success: 'User created' }, status: 201 }
	}
}
