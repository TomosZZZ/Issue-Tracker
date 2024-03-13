'use server'

import { userService } from '../../service'

export const getUserById = async (id: string) => {
	return await userService.getUserById(id)
}
