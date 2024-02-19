'use server'

import { LoginFormData } from '@/features/auth/types'
import { UserService } from '@/features/user/service/UserService'

export const login = async (values: LoginFormData) => {
	const userService = new UserService()
	const { error, success } = await userService.login(values)
	if (error) return { error }
	if (success) return { success }
}
