'use client'

import React, { useTransition } from 'react'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Issue } from '@/features/issue/types/Issue'
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa'

import Link from 'next/link'
import { deleteIssue } from '@/actions/deleteIssue'
import { useToast } from '@/components/ui/use-toast'
import { getIssues } from '@/actions/getIssues'


export const IssuesListItem = (props: {
	issue: Issue
	onRefreshIssues: (issues: Issue[]) => void
}) => {
	const { issue, onRefreshIssues } = props
	const { toast } = useToast()
	const [isPending, startTransition] = useTransition()

	const deleteIssueHandler = () => {
		startTransition(() => {
			deleteIssue(issue.id)
				.then(async () => {
					const issues = (await getIssues()) as Issue[]
					onRefreshIssues(issues)
					toast({
						title: 'Success!',
						description: 'Deleting issue succeed.',
					})
				})
				.catch(error => {
					toast({
						title: 'Error',
						description: error.message || 'Something went wrong',
						variant: 'destructive',
					})
				})
		})
	}
	return (
		<AccordionItem value={`${issue.id}`}>
			<AccordionTrigger>
				<div className='flex flex-col sm:flex-row text-left justify-between w-[80%] overflow-hidden'>
					<p className='text-sm  break-words w-[80%]'>{issue.title}</p>
					<h3 className='text-sm'>{issue.status}</h3>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className='flex justify-between '>
					<div className=' text-sm w-[80%]'>
						<p>{issue.description}</p>
					</div>

					<div className='flex '>
						<Button className=' bg-sky-400 mx-2 hover:bg-sky-600 p-0 '>
							<Link className='py-2 px-3' href={`/issues/edit?id=${issue.id}`}>
								<FaEdit />
							</Link>
						</Button>
						<Button
							disabled={isPending}
							onClick={deleteIssueHandler}
							className=' bg-red-600 hover:bg-red-700 mx-2 py-2 px-3'>
							<FaRegTrashAlt className='sm:text-xltext-sm font-bold' />
						</Button>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
