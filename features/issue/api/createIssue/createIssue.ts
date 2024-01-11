import { createIssueSchema } from '@/features/issue'
import { z } from 'zod'

type IssueFormSchema = z.infer<typeof createIssueSchema>

export const createIssue = async (data: IssueFormSchema) => {
	const response = await fetch(`/api/issues`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	const issue = await response.json()
	return issue
}
