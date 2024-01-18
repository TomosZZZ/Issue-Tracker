import { EditIssueSchema } from '../../schemas'

import { z } from 'zod'

type EditIssueFormData = z.infer<typeof EditIssueSchema>

interface EditIssueProps {
	editedIssue: EditIssueFormData
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
