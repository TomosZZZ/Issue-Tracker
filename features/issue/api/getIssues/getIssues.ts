import { Issue } from '@/features/issue/types/Issue'

export const getIssues = async () => {
	const response = await fetch(`/api/issues`)
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	const issues = (await response.json()) as Issue[]
	return issues
}
