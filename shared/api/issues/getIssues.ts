import { IssueModel } from '@/types/IssueModel'

const API_PATH = process.env.NEXT_PUBLIC_API_PATH

export const getIssues = async () => {
	const response = await fetch(`${API_PATH}/api/issues`)
	if (!response.ok) {
		return { message: 'Something went wrong', statuse: response.status }
	}
	const issues = (await response.json()) as IssueModel[]
	return issues
}
