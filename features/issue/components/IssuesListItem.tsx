import React from 'react'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { IssueModel } from '@/types/IssueModel'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteIssue } from '@/shared/utils'
import { useToast } from '@/components/ui/use-toast'

export const IssuesListItem = (props: { issue: IssueModel }) => {
	const { issue } = props
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

	const deleteIssueHandler = () => {
		deleteIssueMutation.mutate(issue.id)
	}
	return (
		<AccordionItem value={`${issue.id}`}>
			<AccordionTrigger>
				<div className='flex flex-col sm:flex-row text-left justify-between w-[80%]'>
					<h2 className='text-sm'>{issue.title}</h2>
					<h3 className='text-sm'>{issue.status}</h3>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className='flex justify-between '>
					<div className=' text-sm w-[80%]'>
						<p>{issue.description}</p>
					</div>

					<div>
						<Button
							onClick={deleteIssueHandler}
							className=' bg-red-600 hover:bg-red-700 py-2 px-3'>
							<FaRegTrashAlt className='sm:text-xltext-sm font-bold' />
						</Button>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
