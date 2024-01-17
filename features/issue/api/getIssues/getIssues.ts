import { IssueModel } from '@/features/issue/types/IssueModel'

export const getIssues = async () => {
	const response = await fetch(`/api/issues`)
	if (!response.ok) {
		return { message: 'Something went wrong', statuse: response.status }
	}
	const issues = (await response.json()) as IssueModel[]
	return issues
}
