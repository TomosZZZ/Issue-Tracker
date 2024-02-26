'use server'

import { issueService } from '@/features/issue/service'

export const deleteIssue = async (issueId: number) => {
	return await issueService.deleteIssue(issueId)
}
