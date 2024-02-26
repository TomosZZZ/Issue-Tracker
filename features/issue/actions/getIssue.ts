'use server'

import { issueService } from '@/features/issue/service'
export const getIssue = async (issueId: number) => {
	if (isNaN(issueId)) {
		throw new Error(`Id: '${issueId}' is not a number`)
	}

	const issue = await issueService.getIssue(issueId)
	if (!issue) {
		throw new Error('Issue not found')
	}
	return issue
}
