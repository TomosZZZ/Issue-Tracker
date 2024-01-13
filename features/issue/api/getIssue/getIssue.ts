import { IssueModel } from '@/types/IssueModel'

export const getIssue = async (id: number) => {
	const response = await fetch(`/api/issues/${id}`)

	if (!response.ok) {
		throw new Error(response.statusText)
	}

	const issue = (await response.json()) as { issue: IssueModel }
	return issue
}
