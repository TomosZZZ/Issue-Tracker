'use server'

import { LoginFormData } from '@/features/auth/types'

import { userService } from '@/features/user/service'
export const login = async (values: LoginFormData) => {
	const { error, success } = await userService.login(values)
	if (error) throw error 
	if (success) return { success }
}
