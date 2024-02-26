'use server'

import { IssueFormData } from '@/features/issue/types'
import { issueService } from '@/features/issue/service'
export const editIssue = async (issueId: number, issue: IssueFormData) => {
	if (isNaN(issueId)) {
		throw new Error(`Id: '${issueId}' is not a number`)
	}

	return await issueService.editIssue(issueId, issue)
}
