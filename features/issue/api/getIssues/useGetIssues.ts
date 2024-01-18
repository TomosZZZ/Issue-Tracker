import { useQuery } from '@tanstack/react-query'
import { getIssues } from './getIssues'

export const useGetIssues = () => {
	const getIssuesQuery = useQuery({
		queryKey: ['issues'],
		queryFn: getIssues,
		initialData: [],
	})
	return getIssuesQuery
}
