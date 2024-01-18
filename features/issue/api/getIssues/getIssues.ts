import { Issue } from '@/features/issue/types/Issue'

export const getIssues = async () => {
	const response = await fetch(`/api/issues`)
	if (!response.ok) {
		return { message: 'Something went wrong', statuse: response.status }
	}
	const issues = (await response.json()) as Issue[]
	return issues
}
