import { IssueModel } from '@/types/IssueModel'

export const getIssues = async () => {
	const response = await fetch('/api/issues')
	if (!response.ok) {
		return { message: 'Something went wrong', status: 400 }
	}
	const issues = (await response.json()) as IssueModel[]
	return issues
}


