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
import { useToast } from '@/components/ui/use-toast'
import { getIssues, deleteIssue } from '@/features/issue/actions'
import { User } from '@/features/user/types'

import { Badge } from '@/components/ui/badge'

type IssuesListItemProps = {
	issue: Issue
	onRefreshIssues: (issues: Issue[]) => void
	users: User[]
	editable?: boolean
}

export const IssuesListItem = ({
	issue,
	onRefreshIssues,
	users,
	editable,
}: IssuesListItemProps) => {
	const { toast } = useToast()
	const [isPending, startTransition] = useTransition()
	const creator = users.find(user => user.id === issue.creatorId)
	const issueUsersIds = issue.users.map(user => user.userId)
	const issueUsers = users.filter(user => issueUsersIds.includes(user.id))

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
				<div className='flex flex-col sm:flex-row text-left justify-between w-[90%] overflow-hidden'>
					<p className='text-sm  break-words w-[80%]'>{issue.title}</p>
					<h3 className='text-sm'>{issue.status}</h3>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className='flex justify-between '>
					<div className={` text-sm ${editable ? 'w-[80%]' : 'w-full'}`}>
						<p className='ml-3 border-b-2 border-dashed border-violet-200 pb-2'>
							{issue.description}
						</p>

						{issueUsers.length > 0 && (
							<div className='mt-3 flex gap-8'>
								<div>
									<p className='text-md font-bold mb-2'>Created by:</p>
									<Badge className=' bg-orange-500 cursor-default hover:bg-orange-700'>
										{creator?.name}
									</Badge>
								</div>
								<div>
									<p className='text-md font-bold mb-2'>Assigned users:</p>
									<ul className='flex  flex-wrap gap-2'>
										{issueUsers.map(user => (
											<li key={user.id}>
												<Badge className='bg-violet-700 cursor-default hover:bg-violet-900'>
													{user.name}
												</Badge>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
					</div>
					{editable && (
						<div className='flex '>
							<Button className=' bg-sky-400 mx-2 hover:bg-sky-600 p-0 '>
								<Link
									className='py-2 px-3'
									href={`/issues/edit?id=${issue.id}`}>
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
					)}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
