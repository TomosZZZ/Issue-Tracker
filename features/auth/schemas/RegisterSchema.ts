import { z } from 'zod'

export const RegisterSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email('Invalid email'),
	password: z
		.string()
		.min(6, { message: 'Password must have at least 6 characters' }),
	name: z.string().min(1, { message: 'Name is required' }),
})
