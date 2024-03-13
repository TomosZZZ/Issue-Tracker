'use server'
import { userService } from '../../service'

export const addFriend = async (userId: string, friendId: string) => {
	const response = await userService.addFriend({ userId, friendId })
	if (response.error) {
		throw new Error(response.error)
	}
	return response
}
