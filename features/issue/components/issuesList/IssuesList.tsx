'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { IssuesListItem } from './IssuesListItem'
import { useToast } from '@/components/ui/use-toast'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Searchbar, StatusFilter } from './issuesFilter'
import { PaginationBar } from '@/shared'
import { getIssues } from '@/actions/getIssues'
import { Issue } from '../../types'

export const IssuesList = () => {
	const [issues, setIssues] = useState<Issue[]>([])
	const [error, setError] = useState('')
	const [isPending, startTransition] = useTransition()

	const { toast } = useToast()
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const fetchIssues = async () => {
			startTransition(async () => {
				const issues = (await getIssues()) as Issue[]
				setIssues(issues)
			})
		}
		fetchIssues().catch(() => setError('Something went wrong'))
	}, [])

	const filteredIssues = issues.filter(issue => {
		return (
			issue.title.toLowerCase().includes(search.toLowerCase()) &&
			issue.status.includes(statusFilter)
		)
	})

	const itemsPerPage = 5
	const lastItemIndex = currentPage * itemsPerPage
	const firstItemIndex = lastItemIndex - itemsPerPage

	const currentIssues = filteredIssues.slice(firstItemIndex, lastItemIndex)

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
				Issues
			</h1>
			{isPending || issues.length === 0 ? (
				<div className='p-5 flex  justify-center'>
					<LoadingSpinner size={35} />
				</div>
			) : (
				<div>
					<div className='flex justify-between '>
						<Searchbar
							className='mb-5 w-[60%]'
							onSetSearch={setSearchHandler}
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
							/>
						))}
					</Accordion>
					{filteredIssues.length > itemsPerPage && (
						<PaginationBar
							itemsPerPage={itemsPerPage}
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
