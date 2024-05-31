import { z } from 'zod'

export const CreateIssueSchema = z.object({
	title: z
		.string()
		.min(1, 'Title must contain at least 1 character')
		.max(255, 'Title must contain less than 255 characters'),
	description: z
		.string()
		.min(1, 'Description must contain at least 1 character'),
	users: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
})
