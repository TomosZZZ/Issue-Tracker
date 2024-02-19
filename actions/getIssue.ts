'use server'

import { IssueService } from '@/features/issue/service/IssueService'

export const getIssue = async (issueId: number) => {
	if (isNaN(issueId)) {
		throw new Error(`Id: '${issueId}' is not a number`)
	}
	const { getIssue } = new IssueService()
	const issue = await getIssue(issueId)
	if (!issue) {
		throw new Error('Issue not found')
	}
	return issue
}
