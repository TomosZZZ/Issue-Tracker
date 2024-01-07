import React from 'react'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { IssueModel } from '@/types/IssueModel'
import { FaRegTrashAlt } from 'react-icons/fa'

export const IssuesListItem = (props: { issue: IssueModel }) => {
	const { issue } = props
	return (
		<AccordionItem value={`${issue.id}`}>
			<AccordionTrigger>
				<div className='flex justify-between w-[80%]'>
					<h2>{issue.title}</h2>
					<h3>{issue.status}</h3>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className='flex justify-between '>
					<div className='w-[80%]'>
						<p>{issue.description}</p>
					</div>

					<div>
						<Button className=' bg-red-600 hover:bg-red-700'>
							<FaRegTrashAlt className='text-xl font-bold' />
						</Button>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
