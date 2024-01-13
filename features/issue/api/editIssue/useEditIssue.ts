import { useMutation } from '@tanstack/react-query'
import { editIssue } from './editIssue'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
export const useEditIssue = () => {
	const router = useRouter()
	const { toast } = useToast()

	const editIssueMutation = useMutation({
		mutationFn: editIssue,
		onSuccess: () => {
			toast({
				title: 'Success!',
				description: 'Editing issue succeed.',
			})
			router.replace('/issues')
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			})
		},
	})

	return editIssueMutation
}
