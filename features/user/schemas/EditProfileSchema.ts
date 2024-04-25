import z from 'zod'

export const EditProfileSchema = z.object({
	name: z.string().min(1, 'Name must contain at least 1 character'),
	image: z.optional(z.string().url('Invalid URL')).or(z.literal('')),
})
