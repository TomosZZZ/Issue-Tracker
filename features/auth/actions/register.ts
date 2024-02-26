'use server'

import { RegisterFormData } from '@/features/auth/types'
import { userService } from '@/features/user/service'
export const register = async (values: RegisterFormData) => {
	const { error, success } = await userService.createUser(values)
	if (error) {
		throw error 
	}
	if (success) {
		return { success }
	}
}
