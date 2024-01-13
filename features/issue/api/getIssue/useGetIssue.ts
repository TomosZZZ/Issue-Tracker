import { useQuery } from '@tanstack/react-query'
import { getIssue } from './getIssue'

export const useGetIssue = (id: number) => {
	const getIssueQuery = useQuery({
		queryKey: ['issues', id],
		queryFn: () => {
			const issue = getIssue(id)
			return issue
		},
	})
	return getIssueQuery
}
