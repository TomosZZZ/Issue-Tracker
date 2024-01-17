import { IssueModel } from '@/features/issue/types/IssueModel'

export const getIssue = async (id: number) => {
	const response = await fetch(`/api/issues/${id}`)

	if (!response.ok) {
		throw new Error(response.statusText)
	}

	return (await response.json()) as { issue: IssueModel }
}
