'use server'

import { IssueService } from '@/features/issue/service/IssueService'
import { IssueFormData } from '@/features/issue/types'

export const createIssue = async (issue: IssueFormData) => {
	const issueService = new IssueService()
	const { createIssue } = issueService
	const { error, success } = await createIssue(issue)
	if (error) {
		return { error }
	}
	if (success) {
		return { success }
	}
}
