'use server'

import { RegisterFormData } from '@/features/auth/types'
import { UserService } from '@/features/user/service/UserService'
export const register = async (values: RegisterFormData) => {
	const { createUser } = new UserService()

	const { error, success } = await createUser(values)
	if (error) {
		return { error }
	}
	if (success) {
		return { success }
	}
}
