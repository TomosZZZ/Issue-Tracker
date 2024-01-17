'use client'

import React, { useState } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { IssuesListItem } from './IssuesListItem'
import { useToast } from '@/components/ui/use-toast'
import { useGetIssues } from '../../api'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Searchbar, StatusFilter } from './issuesFilter'

export const IssuesList = () => {
	const { data: issues, isLoading, isError } = useGetIssues()
	const { toast } = useToast()
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const getSearchHandler = (search: string) => {
		setSearch(search)
	}
	const getStatusFilterHandler = (status: string) => {
		setStatusFilter(status)
	}
	if (isError) {
		toast({
			title: 'Error',
			description: 'Something went wrong',
			variant: 'destructive',
		})
	}
	console.log(statusFilter)
	return (
		<div className='sm:px-8 sm:py-6 p-2 '>
			<h1 className='text-2xl text-gray-800 tracking-wide font-bold text-center mb-5'>
				Issues
			</h1>
			{isLoading ? (
				<div className='p-5 flex  justify-center'>
					<LoadingSpinner size={35} />
				</div>
			) : (
				<div>
					<div className='flex justify-between '>
						<Searchbar
							className='mb-5 w-[60%]'
							onGetSearch={getSearchHandler}
						/>
						<StatusFilter
							className='w-[30%]'
							onGetStatusFilter={getStatusFilterHandler}
						/>
					</div>
					<div className='h-[2px] rounded-sm mb-5 mt-5 opacity-30  bg-violet-500'></div>
					<Accordion type='single' collapsible>
						{Array.isArray(issues) &&
							issues.map(issue => {
								if (statusFilter === 'all' || statusFilter === '') {
									if (search === '') {
										return <IssuesListItem key={issue.id} issue={issue} />
									} else if (
										issue.title.toLowerCase().includes(search.toLowerCase())
									) {
										return <IssuesListItem key={issue.id} issue={issue} />
									}
								} else if (statusFilter === issue.status) {
									if (search === '') {
										return <IssuesListItem key={issue.id} issue={issue} />
									} else if (
										issue.title.toLowerCase().includes(search.toLowerCase())
									) {
										return <IssuesListItem key={issue.id} issue={issue} />
									}
								}
							})}
					</Accordion>
				</div>
			)}
		</div>
	)
}
