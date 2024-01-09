import { useQuery } from '@tanstack/react-query'
import { getIssues } from '@/shared/api/issues'

export const useGetIssues = () => {
	const getIssuesQuery = useQuery({
		queryKey: ['issues'],
		queryFn: getIssues,
	})
	return getIssuesQuery
}
