'use client'

import React from 'react'
import { getIssues } from '@/shared/utils'
import { Accordion } from '@/components/ui/accordion'

import { IssuesListItem } from './IssuesListItem'
import { useQuery } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

export const IssuesList = () => {
	const {
		data: issues,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['issues'],
		queryFn: getIssues,
	})

	const { toast } = useToast()

	if (isError) {
		toast({
			title: 'Error',
			description: 'Something went wrong',
			variant: 'destructive',
		})
	}
	return (
		<div className='px-8 py-6'>
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
