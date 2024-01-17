import { CreateIssueSchema } from '@/features/issue'
import { z } from 'zod'

type IssueFormSchema = z.infer<typeof CreateIssueSchema>

export const createIssue = async (data: IssueFormSchema) => {
	const response = await fetch(`/api/issues`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return await response.json()
}
