import z from 'zod'

export const EditPasswordSchema = z
	.object({
		password: z.string().min(6, 'Password must contain at least 6 characters'),
		newPassword: z
			.string()
			.min(6, 'Password must contain at least 6 characters'),
		passwordConfirmation: z
			.string()
			.min(6, 'Password must contain at least 6 characters'),
	})
	.refine(data => data.newPassword === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation'],
	})
