import { editIssueSchema } from '@/features/issue'
import { z } from 'zod'

type EditIssueFormSchema = z.infer<typeof editIssueSchema>

export const editIssue = async (data: {
	editedIssue: EditIssueFormSchema
	issueId: number
}) => {
	const response = await fetch(`/api/issues/edit/${data.issueId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ issue: data.editedIssue }),
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	const editedIssue = await response.json()
	return editedIssue
}
