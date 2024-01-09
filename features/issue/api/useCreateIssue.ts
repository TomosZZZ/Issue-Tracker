import { useMutation } from '@tanstack/react-query'
import { createIssue } from './createIssue'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
export const useCreateIssue = () => {
	const router = useRouter()
	const { toast } = useToast()

	const createIssueMutation = useMutation({
		mutationFn: createIssue,
		onSuccess: () => {
			toast({
				title: 'Success!',
				description: 'Creating issue succeed.',
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
    
	return createIssueMutation
}
