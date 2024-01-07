'use client'

import React, { useEffect, useState } from 'react'
import { getIssues } from '@/shared/utils'
import {
	Accordion,
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
} from '@/components/ui/accordion'

import { IssueModel } from '@/types/IssueModel'
import { ErrorModel } from '@/types/ErrorModel'
import { IssuesListItem } from './IssuesListItem'
export const IssuesList = () => {
	const [issues, setIssues] = useState<IssueModel[] | ErrorModel>([])

	useEffect(() => {
		const fetchIssues = async () => {
			const fetchedIssues = await getIssues()
			setIssues(fetchedIssues)
		}
		fetchIssues()
	}, [])
	console.log(issues)

	return (
		<div className='px-8 py-6'>
			<Accordion type='single' collapsible>
				{Array.isArray(issues) &&
					issues.map(issue => <IssuesListItem key={issue.id} issue={issue} />)}
			</Accordion>
		</div>
	)
}
