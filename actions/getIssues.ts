'use server'
import { IssueService } from '@/features/issue/service/IssueService'

export const getIssues = async () => {
	const issueService = new IssueService()
	const { getIssues } = issueService

	return await getIssues()
}
