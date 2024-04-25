'use server'

import { EditUserDto } from '../../dto'
import { userService } from '../../service'

export const editUser = async (data: EditUserDto, id: string) => {
	const response = await userService.editUser(data, id)
	if (response.error) {
		throw new Error(response.error)
	}
	return response.success
}
