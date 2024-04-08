'use server'

import { userService } from '../../service'

export const editUser = async (
	data: { name: string; image: string },
	id: string
) => {
	const response = await userService.editUser(data, id)
	if (response.error) {
		throw new Error(response.error)
	}
	return response.success
}
