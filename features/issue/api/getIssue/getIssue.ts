import { IssueModel } from '@/types/IssueModel'

export const getIssue = async (id: number) => {
	const response = await fetch(`/api/issues/${id}`)

	if (!response.ok) {
		// return { message: response.statusText, status: response.status }
		throw new Error(response.statusText)
	}

	const issue = (await response.json()) as IssueModel

	return issue
}
