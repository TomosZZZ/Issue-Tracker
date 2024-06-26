import { z } from 'zod'
import { Status } from '../types/Issue'
export const EditIssueSchema = z.object({
	title: z
		.string()
		.min(1, 'Title must contain at least 1 character')
		.max(255, "Title can't be longer than 255 characters"),
	description: z
		.string()
		.min(1, 'Description must contain at least 1 character'),
	status: z.nativeEnum(Status),
	users: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
})
