'use server'

import { userService } from '../../service'
import { ChangePasswordDto } from '../../dto'

export const changePassword = async (data: ChangePasswordDto) => {
	const response = await userService.changePassword(data)
	if (response.error) {
		throw new Error(response.error)
	}
	return response
}
