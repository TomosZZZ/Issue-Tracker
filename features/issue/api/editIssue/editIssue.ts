import { EditIssueSchema } from '@/features/issue'
import { z } from 'zod'

type EditIssueFormSchema = z.infer<typeof EditIssueSchema>

interface EditIssueProps {
	editedIssue: EditIssueFormSchema
	issueId: number
}

export const editIssue = async ({ editedIssue, issueId }: EditIssueProps) => {
	const response = await fetch(`/api/issues/edit/${issueId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ issue: editedIssue }),
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response.json()
}