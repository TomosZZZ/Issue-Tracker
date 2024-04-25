'use server'

import { userService } from '../../service'

export const deleteFriend = async (userId: string, friendId: string) => {
	const response = await userService.deleteFriend(userId, friendId)
	if (response.error) throw new Error(response.error)
	return response
}
