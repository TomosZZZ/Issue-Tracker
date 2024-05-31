'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { IssuesListItem } from './IssuesListItem'
import { useToast } from '@/components/ui/use-toast'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { StatusFilter } from './issuesFilter'
import { PaginationBar } from '@/shared'
import { getIssues } from '@/features/issue/actions'
import { Issue } from '../../types'
import { Searchbar } from '@/shared'
import { paginationHandler } from '@/utils'
import { getUsers } from '@/features/user/actions'
import { User } from '@/features/user/types'
import { useSession } from 'next-auth/react'

const ITEMS_PER_PAGE = 5
type IssuesListProps = {
	variant: 'myIssues' | 'allIssues'
}

export const IssuesList = ({ variant }: IssuesListProps) => {
	const [issues, setIssues] = useState<Issue[]>([])
	const [users, setUsers] = useState<User[]>([])
	const [error, setError] = useState('')
	const [isPending, startTransition] = useTransition()

	const { toast } = useToast()
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const { data: session } = useSession()
	const currentUserId = session?.user?.id

	useEffect(() => {
		const fetchIssues = async () => {
			startTransition(async () => {
				let issues = (await getIssues()) as Issue[]
				if (!currentUserId) return
				if (variant === 'myIssues') {
					issues = issues.filter(issue => issue.creatorId === currentUserId)
				} else if (variant === 'allIssues') {
					issues = issues.filter(issue => {
						return issue.users.find(user => user.userId === currentUserId)
					})
				}
				setIssues(issues)
			})
		}

		const fetchUsers = async () => {
			const users = await getUsers()
			setUsers(users)
		}
		fetchUsers().catch(err => setError(err.message || 'Could not fetch users.'))
		fetchIssues().catch(err =>
			setError(err.message || 'Could not fetch issues.')
		)
	}, [variant, currentUserId])

	const filteredIssues = issues.filter(issue => {
		return (
			issue.title.toLowerCase().includes(search.toLowerCase()) &&
			issue.status.includes(statusFilter)
		)
	})

	const currentIssues = paginationHandler({
		paginatedItems: filteredIssues,
		currentPage,
		itemsPerPage: ITEMS_PER_PAGE,
	})

	const setSearchHandler = (search: string) => {
		setSearch(search)
	}
	const setStatusFilterHandler = (status: string) => {
		if (status === 'all') {
			setStatusFilter('')
		} else {
			setStatusFilter(status)
		}
	}

	const refreshIssuesHandler = (issues: Issue[]) => {
		setIssues(issues)
	}

	if (error) {
		toast({
			title: 'Error',
			description: error || 'Something went wrong',
			variant: 'destructive',
		})
	}

	return (
		<div className='sm:px-8 sm:py-6 p-2 '>
			<h1 className='text-2xl text-gray-800 tracking-wide font-bold text-center mb-5'>
				{variant === 'allIssues' ? 'Issues' : 'My Issues'}
			</h1>
			{error && <p>{error}</p>}
			{isPending && issues.length === 0 && (
				<div className='p-5 flex  justify-center'>
					<LoadingSpinner size={35} />
				</div>
			)}
			{!isPending && issues.length === 0 && currentUserId && (
				<div className='p-5 flex justify-center'>
					<p>No issues found</p>
				</div>
			)}
			{issues.length > 0 && users.length > 0 && !isPending && (
				<div>
					<div className='flex justify-between '>
						<Searchbar
							className='mb-5 w-[60%]'
							handleSearchChange={setSearchHandler}
						/>
						<StatusFilter
							className='w-[30%]'
							onGetStatusFilter={setStatusFilterHandler}
						/>
					</div>
					<div className='h-[2px] rounded-sm mb-5 mt-5 opacity-30  bg-violet-500'></div>
					<Accordion className='mb-10' type='single' collapsible>
						{currentIssues.map(issue => (
							<IssuesListItem
								onRefreshIssues={refreshIssuesHandler}
								key={issue.id}
								issue={issue}
								users={users}
								editable={variant === 'myIssues'}
							/>
						))}
					</Accordion>
					{filteredIssues.length > ITEMS_PER_PAGE && (
						<PaginationBar
							itemsPerPage={ITEMS_PER_PAGE}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalItems={filteredIssues.length}
						/>
					)}
				</div>
			)}
		</div>
	)
}
