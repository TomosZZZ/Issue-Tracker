'use server'

import { IssueFormData } from '@/features/issue/types'
import { issueService } from '@/features/issue/service'
export const createIssue = async (issue: IssueFormData) => {
	const { error, success } = await issueService.createIssue(issue)
	if (error) {
		return { error }
	}
	if (success) {
		return { success }
	}
}
