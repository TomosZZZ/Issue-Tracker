'use client'

import React from 'react'
import { Accordion } from '@/components/ui/accordion'
import { IssuesListItem } from './IssuesListItem'
import { useToast } from '@/components/ui/use-toast'
import { useGetIssues } from '@/shared/api/issues'

export const IssuesList = () => {
	const { data: issues, isLoading, isError } = useGetIssues()
	const { toast } = useToast()

	if (isError) {
		toast({
			title: 'Error',
			description: 'Something went wrong',
			variant: 'destructive',
		})
	}
	return (
		<div className='sm:px-8 sm:py-6 p-2 '>
			<h1 className='text-2xl font-bold text-center mb-5'>Issues</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<Accordion type='single' collapsible>
					{Array.isArray(issues) &&
						issues.map(issue => (
							<IssuesListItem key={issue.id} issue={issue} />
						))}
				</Accordion>
			)}
		</div>
	)
}
