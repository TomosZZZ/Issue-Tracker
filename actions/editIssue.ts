'use server'

import { IssueService } from '@/features/issue/service/IssueService'
import { IssueFormData } from '@/features/issue/types'

export const editIssue = async (issueId: number, issue: IssueFormData) => {
	const { editIssue } = new IssueService()

	if (isNaN(issueId)) {
		throw new Error(`Id: '${issueId}' is not a number`)
	}

	return await editIssue(issueId, issue)
}
