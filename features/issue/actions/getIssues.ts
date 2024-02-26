'use server'

import { issueService } from '@/features/issue/service'

export const getIssues = async () => {
	return await issueService.getIssues()
}
