import React from 'react'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { IssueModel } from '@/types/IssueModel'
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa'
import { useDeleteIssue } from '../api'
import Link from 'next/link'

export const IssuesListItem = (props: { issue: IssueModel }) => {
	const { issue } = props

	const deleteIssueMutation = useDeleteIssue()
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
						<Button className=' bg-sky-400 mx-2 hover:bg-sky-600 py-2 px-3'>
							<Link href={`/issues/edit?id=${issue.id}`}>
								<FaEdit />
							</Link>
						</Button>
						<Button
							disabled={deleteIssueMutation.isPending}
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
