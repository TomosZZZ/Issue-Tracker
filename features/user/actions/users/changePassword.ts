'use server'
import z from 'zod'
import { EditPasswordSchema } from '../../schemas'
import { userService } from '../../service'

export const changePassword = async (
	data: z.infer<typeof EditPasswordSchema> & { id: string }
) => {
	const response = await userService.changePassword(data)
	if (response.error) {
		throw new Error(response.error)
	}
	return response
}
