import { z } from 'zod'

export const editIssueSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().min(1),
	status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']),
})
