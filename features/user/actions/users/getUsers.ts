'use server'
import { userService } from '@/features/user/service'

export const getUsers = async () => {
	return await userService.getUsers()
}
