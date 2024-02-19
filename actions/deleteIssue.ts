'use server'

import { IssueService } from '@/features/issue/service/IssueService'

export const deleteIssue = async (issueId: number) => {
	const { deleteIssue } = new IssueService()
	return deleteIssue(issueId)
}
