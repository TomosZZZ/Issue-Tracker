import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteIssue } from './deleteIssue'
import { useToast } from '@/components/ui/use-toast'

export const useDeleteIssue = () => {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const deleteIssueMutation = useMutation({
		mutationFn: deleteIssue,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['issues'] })
			toast({
				title: 'Success!',
				description: 'Deleting issue succeed.',
			})
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			})
		},
	})
	return deleteIssueMutation
}
